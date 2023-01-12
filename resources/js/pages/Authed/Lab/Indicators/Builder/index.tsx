import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Box, Breadcrumbs, Button, Grid, SegmentedControl, Tab, Text, TextInput } from '@mantine/core';
import { FaChevronCircleRight, FaWindowClose } from 'react-icons/fa';
import { getIndicator, updateIndicator } from 'API/indicators';
import { Link } from 'react-router-dom';
import { useWebSocket } from 'Components/WebSocketContext';

const Builder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { indicatorId } = useParams();
    const { authed } = PATHS;
    const socket = useWebSocket();
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Indicator Builder', href: null}
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [ tab, setTab ] = useState<string>('1');
    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ indicator, setIndicator ] = useState<any>(null);
    const [ autosaveNameHandle, setAutoSaveNameHandle ] = useState<any>(null);
    const [ autosaveHandle, setAutoSaveHandle ] = useState<any>(null);
    const [ lastUpdated, setLastUpdated ] = useState<any>(null);
    const [ buildVersion, setBuildVersion ] = useState<any>(null);
    const [ ctConsoleText, setCTConsoleText ] = useState<string>('');
    const [ pConsoleText, setPConsoleText ] = useState<string>('');

    const addConsoleLine = (f: any, v: any, text: string) => {
        f(v + `[${(new Date()).toISOString()}]: ` + text + "\n\r");
    };

    // load indicator details from api
    useEffect(() => {
        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle(`Project - ${indicatorId}`));

        addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator loading...');

        if(indicatorId && socket) {
            socket.on('message', (message) => {
                if(message.meta.category !== 'INDICATOR_BUILDER') {
                    return;
                }

                if(message.meta.type === 'BUILD_COMPLETED') {
                    addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator strategy built successfully in ' + message.data.buildTime + 'ms');
                }
                else if(message.meta.type === 'ERROR') {
                    addConsoleLine(setPConsoleText, pConsoleText, 'Indicator strategy failed to build!');
                    addConsoleLine(setPConsoleText, pConsoleText, JSON.stringify(message.data.error));
                }

                console.log(message);
            });

            getIndicator(parseInt(indicatorId)).then(({data}) => {
                setIndicator(data);
                setLastUpdated(data.updated_at);
                setBuildVersion(data.algorithm_version);

                addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator loaded successfully');

                socket.emit('join_channel', 'INDICATOR_BUILDER:*:' + data.id);
            }).catch(e => {
                // indicator is not found redirect to indicator list view
                navigate(`/indicators`);
            });
        }
        else {
            // indicator is not found redirect to indicator list view
            navigate(`/indicators`);
        }
    }, []);

    return (
        <>
            <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs>

            {indicator && <>
                <Grid columns={24}>
                    <Grid.Col span={18}>
                        {/* Indicator name */}
                        {!!!showForm ? <h3 style={{marginTop: '0'}} onClick={() => {
                            setShowForm(true);
                        }}>{indicator.name}</h3> : <TextInput
                            style={{marginBottom: '1em'}}
                            rightSection={<FaWindowClose onClick={() => {
                                setShowForm(false);
                            }} />}
                            label=""
                            value={indicator.name}
                            onChange={(event) => {
                                indicator.name = event.currentTarget.value;

                                addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator being saved...');

                                // debounce and send update to api
                                clearTimeout(autosaveNameHandle);
                                const saveNameTimeout = setTimeout(() => {
                                    updateIndicator(indicator.id, indicator).then(({data}) => {
                                        setLastUpdated(data.updated_at);
                                        setBuildVersion(data.algorithm_version);
                                        setShowForm(false);
                                        addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator saved');
                                    });
                                }, 300);
                                setAutoSaveNameHandle(saveNameTimeout);
                            }}
                        />}

                        <Text inline={true} color="grey" size="sm">
                            last saved: {(new Date(lastUpdated)).toLocaleString()}<br />
                            build: v{buildVersion}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        {/* Buttons/Controls */}
                        <Button onClick={() => {
                            updateIndicator(indicator.id, indicator).then(({data}) => {
                                setLastUpdated(data.updated_at);
                                setBuildVersion(data.algorithm_version);
                                addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator saved');
                            });
                        }}>Build &nbsp;</Button>&nbsp;
                        <Button onClick={() => {
                            // go to indicator test page
                            navigate(`/indicators/${indicatorId}/test-setup`);
                        }}>Test &nbsp;<FaChevronCircleRight /></Button>
                    </Grid.Col>
                </Grid>

                {/* Code editor */}
                <div style={{marginTop: '14px'}}>
                    <Editor
                        height="70vh"
                        defaultLanguage="typescript"
                        theme="vs-dark"
                        value={indicator.algorithm_text}
                        onChange={(code, event) => {
                            indicator.algorithm_text = code;
                            setIndicator(indicator);

                            addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator being saved...');

                            // debounce and send update to api
                            /*clearTimeout(autosaveHandle);
                            const saveTimeout = setTimeout(() => {
                                updateIndicator(indicator.id, indicator).then(({data}) => {
                                    setLastUpdated(data.updated_at);
                                    setBuildVersion(data.algorithm_version);
                                    addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator saved');
                                });
                            }, 3000);
                            setAutoSaveHandle(saveTimeout);*/
                        }}
                        onMount={(editor, monaco) => {
                            monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "typescript", []);
                        }}
                        onValidate={(markers) => {
                            monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "typescript", []);
                        }}
                    />
                </div>

                {/* Debug Console */}
                <SegmentedControl 
                    size="lg"
                    fullWidth
                    value={tab}
                    onChange={setTab}
                    color="dark"
                    data={[
                        { label: 'Cloud Terminal', value: '1' },
                        { label: 'Problems', value: '2' }
                    ]}
                />
                <Box styles={{ paddingTop: '14px' }}>
                    {tab == '1' && <>
                        {/* <Console logs={[]} variant="dark" /> */}
                        <textarea 
                            className='console-text cloud-terminal'
                            value={ctConsoleText}
                            disabled={true}
                        />
                    </>}

                    {tab == '2' && <>
                        {/* <Console logs={[]} variant="dark" /> */}
                        <textarea 
                            className='console-text problems'
                            value={pConsoleText}
                            disabled={true}
                        />
                    </>}
                </Box>
            </>}
        </>
    )
};

export default Builder;