import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Box, Button, Grid, SegmentedControl, Tab, Text, TextInput } from '@mantine/core';
import { FaBuilding, FaChevronCircleRight, FaCog, FaWindowClose } from 'react-icons/fa';
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
    const editorRef = useRef<any>(null);
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
        const date = new Date();
        // const timestamp = date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + ' ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
        const timestamp = date.toLocaleString();

        f(v + `[${timestamp}]: ` + text + "\n\r");
    };

    // setup websocket handlers and subscribe to build events
    useEffect(() => {
        if(socket && projectId) {
            // subscribe to build events
            socket.emit('join_channel', 'STRATEGY_BUILDER:*:' + projectId);

            socket.on('message', (message) => {
                if(message.meta.category !== 'STRATEGY_BUILDER') {
                    return;
                }

                if(message.meta.type === 'BUILD_COMPLETED') {
                    addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy built successfully in ' + message.data.buildTime + 'ms');

                    setProject(message.data.strategy);
                    setLastUpdated(message.data.strategy.updated_at);
                    setBuildVersion(message.data.strategy.algorithm_version);
                }
                else if(message.meta.type === 'ERROR') {
                    addConsoleLine(setPConsoleText, pConsoleText, 'Strategy failed to build!');
                    addConsoleLine(setPConsoleText, pConsoleText, JSON.stringify(message.data.error));
                }

                console.log(message);
            });
        }

        // unmount
        return () => {
            if(socket) {
                socket.emit('leave_channel', 'STRATEGY_BUILDER:*:' + projectId);
            }
        };
    }, [socket, projectId]);

    // load project details from api
    useEffect(() => {
        if(projectId) {
            dispatch(setTitle(`Project - ${projectId}`));

            getBot(parseInt(projectId)).then(({data}) => {
                setProject(data);
                setLastUpdated(data.updated_at);
                setBuildVersion(data.algorithm_version);

                addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy successfully loaded');
            }).catch(e => {
                console.log(e);

                // project is not found redirect to project list view
                navigate(`/lab/projects`);
            });
        }
        else {
            // project is not found redirect to project list view
            navigate(`/lab/projects`);
        }
    }, [projectId]);

    return (
        <>
            {project && <>
                
                <Grid columns={24}>
                    <Grid.Col span={12}>
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

                                // addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy being saved...');

                                // debounce and send update to api
                                clearTimeout(autosaveNameHandle);
                                const saveNameTimeout = setTimeout(() => {
                                    updateBot(project.id, project).then(({data}) => {
                                        setProject(data);
                                        setLastUpdated(data.updated_at);
                                        setBuildVersion(data.algorithm_version);
                                        setShowForm(false);
                                        // addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy saved');
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
                    <Grid.Col span={12} style={{textAlign: 'right'}}>
                        {/* Buttons/Controls */}
                        <Button disabled={/*buildVersion == project.algorithm_version*/false} onClick={() => {
                            updateBot(project.id, project).then(({data}) => {
                                setProject(data);
                                setLastUpdated(data.updated_at);
                                setBuildVersion(data.algorithm_version);
                                // addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy saved');
                            });
                        }}>Build &nbsp;<FaCog /></Button>&nbsp;
                        <Button disabled={buildVersion != project.algorithm_version} onClick={() => {
                            // go to backtest setup page
                            navigate(`/lab/projects/${projectId}/backtest-setup`);
                        }}>Backtest &nbsp;<FaChevronCircleRight /></Button>&nbsp;
                        <Button disabled={buildVersion != project.algorithm_version} onClick={() => {
                            // go to live setup page
                            navigate(`/lab/projects/${projectId}/optimization-setup`);
                        }}>Optimize &nbsp;<BiUpvote /></Button>&nbsp;
                        <Button disabled={buildVersion != project.algorithm_version} onClick={() => {
                            // go to live setup page
                            navigate(`/lab/projects/${projectId}/live-setup`);
                        }}>Go Live &nbsp;<BsLightning /></Button>
                    </Grid.Col>
                </Grid>

                {/* Code editor */}
                <div style={{marginTop: '14px'}}>
                    <Editor
                        height="64vh"
                        defaultLanguage="typescript"
                        theme="vs-dark"
                        path={`inmemory://models/projects/${projectId}/Strategy.ts`}
                        value={project.algorithm_text}
                        options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            language: 'typescript'
                        }}
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
                            // monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "typescript", []);
                            editorRef.current = editor;

                            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                                allowNonTsExtensions: true
                            });

                            monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

                            let defModel = monaco.editor.getModel(monaco.Uri.parse(`inmemory://models/projects/${projectId}/Sandbox.ts`));
                            if (!defModel) {
                                const code = `class Sandbox {

                                    input(inputKey) {

                                    }

                                    on(eventStream, callback) {

                                    }

                                    limitOrder() {

                                    }
                                }`;

                                defModel = monaco.editor.createModel(code, "typescript", monaco.Uri.parse(`inmemory://models/projects/${projectId}/Sandbox.ts`));
                                // editor.setModel(defModel);
                            }

                            // custom keyboard shortcuts
                            // save using cmd+s (ctrl+s on windows)
                            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
                                updateBot(project.id, project).then(({data}) => {
                                    setProject(data);
                                    setLastUpdated(data.updated_at);
                                    setBuildVersion(data.algorithm_version);
                                    // addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy saved');
                                });
                            }, 'save');

                        }}
                        onValidate={(markers) => {
                            // monaco.editor.setModelMarkers(monaco.editor.getModels()[0], "typescript", []);
                        }}
                    />
                </div>

                {/* Debug Console */}
                <SegmentedControl 
                    size="sm"
                    fullWidth
                    value={tab}
                    onChange={setTab}
                    style={{marginTop: '8px'}}
                    // color="dark"
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