import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
// import CodeEditor from '@uiw/react-textarea-code-editor';
// import Editor from 'react-simple-code-editor';
// import Prism, { highlight } from 'prismjs';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/themes/prism.css';
import { Console, Hook, Unhook, Decode } from 'console-feed';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Box, Breadcrumbs, Button, Grid, SegmentedControl, Tab, Text, TextInput } from '@mantine/core';
import { FaBuilding, FaChevronCircleRight, FaWindowClose } from 'react-icons/fa';
import { BsGearFill, BsLightning } from 'react-icons/bs';
import { getBot, updateBot } from 'API/bots';
import { useWebSocket } from 'Components/WebSocketContext';
import { BiUpvote } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Builder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { authed } = PATHS;
    const socket = useWebSocket();
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Project builder', href: null}
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [ tab, setTab ] = useState<string>('1');
    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ project, setProject ] = useState<any>(null);
    const [ autosaveNameHandle, setAutoSaveNameHandle ] = useState<any>(null);
    const [ autosaveHandle, setAutoSaveHandle ] = useState<any>(null);
    const [ lastUpdated, setLastUpdated ] = useState<any>(null);
    const [ buildVersion, setBuildVersion ] = useState<any>(null);
    const [ ctConsoleText, setCTConsoleText ] = useState<string>('');
    const [ pConsoleText, setPConsoleText ] = useState<string>('');

    const addConsoleLine = (f: any, v: any, text: string) => {
        f(v + `[${(new Date()).toISOString()}]: ` + text + "\n\r");
    };

    // load project details from api
    useEffect(() => {
        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle(`Project - ${projectId}`));

        addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy loading...');

        if(projectId && socket) {

            socket.on('message', (message) => {
                if(message.meta.category !== 'STRATEGY_BUILDER') {
                    return;
                }

                if(message.meta.type === 'BUILD_COMPLETED') {
                    addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy built successfully in ' + message.data.buildTime + 'ms');
                }
                else if(message.meta.type === 'ERROR') {
                    addConsoleLine(setPConsoleText, pConsoleText, 'Strategy failed to build!');
                    addConsoleLine(setPConsoleText, pConsoleText, JSON.stringify(message.data.error));
                }

                console.log(message);
            });

            getBot(parseInt(projectId)).then(({data}) => {
                setProject(data);
                setLastUpdated(data.updated_at);
                setBuildVersion(data.algorithm_version);

                addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy loaded successfully');

                socket.emit('join_channel', 'STRATEGY_BUILDER:*:' + data.id);
            }).catch(e => {
                // project is not found redirect to project list view
                // navigate(`/projects`);
            });
        }
        else {
            // project is not found redirect to project list view
            // navigate(`/projects`);
        }
    }, [projectId, socket]);

    return (
        <>
            <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs>

            {project && <>
                
                <Grid columns={24}>
                    <Grid.Col span={18}>
                        {/* Project name */}
                        {!!!showForm ? <h3 style={{marginTop: '0'}} onClick={() => {
                            setShowForm(true);
                        }}>{project.name}</h3> : <TextInput
                            style={{marginBottom: '1em'}}
                            rightSection={<FaWindowClose onClick={() => {
                                setShowForm(false);
                            }} />}
                            label=""
                            value={project.name}
                            onChange={(event) => {
                                project.name = event.currentTarget.value;

                                addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy being saved...');

                                // debounce and send update to api
                                clearTimeout(autosaveNameHandle);
                                const saveNameTimeout = setTimeout(() => {
                                    updateBot(project.id, project).then(({data}) => {
                                        setLastUpdated(data.updated_at);
                                        setBuildVersion(data.algorithm_version);
                                        setShowForm(false);
                                        addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy saved');
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
                            updateBot(project.id, project).then(({data}) => {
                                setLastUpdated(data.updated_at);
                                setBuildVersion(data.algorithm_version);
                                addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy saved');
                            });
                        }}>Build &nbsp;</Button>&nbsp;
                        <Button onClick={() => {
                            // go to backtest setup page
                            navigate(`/projects/${projectId}/backtest-setup`);
                        }}>Backtest &nbsp;<FaChevronCircleRight /></Button>&nbsp;
                        <Button disabled={true}>Optimize &nbsp;<BiUpvote /></Button>&nbsp;
                        <Button disabled={true}>Go Live &nbsp;<BsLightning /></Button>
                    </Grid.Col>
                </Grid>

                {/* Code editor */}
                <div style={{marginTop: '14px'}}>
                    <Editor
                        height="70vh"
                        defaultLanguage="typescript"
                        theme="vs-dark"
                        value={project.algorithm_text}
                        onChange={(code, event) => {
                            project.algorithm_text = code;
                            setProject(project);

                            /*addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy being saved...');

                            // debounce and send update to api
                            clearTimeout(autosaveHandle);
                            const saveTimeout = setTimeout(() => {
                                updateBot(project.id, project).then(({data}) => {
                                    setLastUpdated(data.updated_at);
                                    setBuildVersion(data.algorithm_version);
                                    addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy saved');
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