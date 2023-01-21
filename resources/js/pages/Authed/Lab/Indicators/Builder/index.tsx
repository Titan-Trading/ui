import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Box, Button, Grid, SegmentedControl, Tab, Text, TextInput } from '@mantine/core';
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
        dispatch(setTitle(`Project - ${indicatorId}`));

        addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator loading...');

        if(socket) {
            socket.on('connect', () => {
                socket.emit('join_channel', 'INDICATOR_BUILDER:*:' + indicatorId);
            });

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
        }

        if(indicatorId) {
            getIndicator(parseInt(indicatorId)).then(({data}) => {
                setIndicator(data);
                setLastUpdated(data.updated_at);
                setBuildVersion(data.algorithm_version);

                addConsoleLine(setCTConsoleText, ctConsoleText, 'Indicator loaded successfully');
            }).catch(e => {
                // indicator is not found redirect to indicator list view
                navigate(`/lab/indicators`);
            });
        }
        else {
            // indicator is not found redirect to indicator list view
            navigate(`/lab/indicators`);
        }
    }, [indicatorId, socket]);

    return (
        <>
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
                            navigate(`/lab/indicators/${indicatorId}/backtest-setup`);
                        }}>Test &nbsp;<FaChevronCircleRight /></Button>
                    </Grid.Col>
                </Grid>

                {/* Code editor */}
                <div style={{marginTop: '14px'}}>
                    <Editor
                        height="64vh"
                        defaultLanguage="typescript"
                        theme="vs-dark"
                        path={`inmemory://models/${indicatorId}/IndicatorStrategy.ts`}
                        value={indicator.algorithm_text}
                        options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            language: 'typescript'
                        }}
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
                            // monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "typescript", []);
                            // monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "typescript", []);
                            // editorRef.current = editor;

                            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                                allowNonTsExtensions: true
                            });

                            monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

                            const defModel = monaco.editor.createModel(`class IndicatorAlgorithm {
                                getSymbol() {
                                    return 'BTCUSDT';
                                }

                                getParameter(type, periods) {
                                    return 1;
                                }

                                getHistoricData(periods) {
                                    return [];
                                }

                                setReady(isReady) {
                                    this.isReady = isReady;
                                }

                                setValues(value) {
                                    this.value = value;
                                }
                            }`, "typescript", monaco.Uri.parse(`inmemory://models/${indicatorId}/IndicatorAlgorithm.ts`));
                            // editor.setModel(defModel);
                        }}
                        onValidate={(markers) => {
                            // monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "typescript", []);
                        }}
                    />
                </div>

                {/* Debug Console */}
                <SegmentedControl 
                    size="lg"
                    fullWidth
                    value={tab}
                    onChange={setTab}
                    // color="dark"
                    style={{ marginTop: '8px' }}
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