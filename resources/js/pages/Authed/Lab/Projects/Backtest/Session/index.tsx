import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvancedChart } from "react-tradingview-embed";
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { getBotSession, getBotSessions, resumeBotSession, stopBotSession } from 'API/botSessions';
import { useSetState } from '@mantine/hooks';
import { getBot } from 'API/bots';
import { isNil } from 'ramda';
import { Anchor, Breadcrumbs, Button, Grid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useWebSocket } from 'Components/WebSocketContext';
import LightweightChart from 'Components/LightweightChart';
import { FaChevronCircleRight, FaCog } from 'react-icons/fa';
import { BiPlay, BiStop, BiUpvote } from 'react-icons/bi';
import { BsLightning } from 'react-icons/bs';
import { RiKnifeBloodFill, RiRestartFill } from 'react-icons/ri';


const Session = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId, sessionId } = useParams();
    const { authed } = PATHS;
    const socket = useWebSocket();
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Project builder', href: `/lab/projects/${projectId}`},
        {title: 'Backtest', href: null},
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [session, setSession] = useState<any>(null);
    const [ chart, setChart ] = useState<any>(null);
    const [ candleSeries, setCandleSeries ] = useState<any>(null);
    const [ lastDateReceived, setLastDateReceived ] = useState<any>(null);
    let updateCount = 0;

    const setupChart = (chart: any) => {
        // const rsiSeries = chart.addLineSeries();

        setChart(chart);

        const candleSeries = chart.addCandlestickSeries();
        setCandleSeries(candleSeries);

        // create series for each indicator

        // candleSeries.setData([]);

        // candleSeries.setData([
        //     {time: 1556877600, open: 456, high: 460, low: 456, close: 458},
        //     {time: 1556881200, open: 458, high: 500, low: 458, close: 480},
        //     {time: 1556884800, open: 480, high: 600, low: 480, close: 590}
        // ]);

        // rsiSeries.setData([
        //     {time: 1556877600, value: 458},
        //     {time: 1556881200, value: 480},
        //     {time: 1556884800, value: 590}
        // ]);
    };

    // get session details from api
    useEffect(() => {
        if(!isNil(projectId) && !isNil(sessionId)) {
            dispatch(setTitle(`Backtesting project ${projectId} - (#${sessionId})`));
            getBotSession(projectId, sessionId).then(({ data }) => {
                setSession(data);
                setLastDateReceived(data.paused_at ? data.paused_at : data.started_at);
            });
        }
    }, [projectId, sessionId]);

    // setup websocket handlers and subscribe to session
    useEffect(() => {
        if(!isNil(projectId) && !isNil(sessionId) && socket) {
            socket.emit('join_channel', 'BACKTEST_SESSION:*:' + projectId + ',' + sessionId);

            socket.on('message', (message) => {
                if(message.meta.category !== 'BACKTEST_SESSION') {
                    return;
                }

                switch(message.meta.type) {
                    case 'START_SESSION':
                        console.log('session started');

                        // setup plugins used
                        // could be adding a series to the chart to show an indicator
                        break;
                    
                    case 'UPDATE_SESSION':
                        // let updateData = [];

                        if(message.meta.updateId === 'ohlc') {
                            const date = message.data.date[0];
                            const open = message.data.open[0];
                            const high = message.data.high[0];
                            const low = message.data.low[0];
                            const close = message.data.close[0];

                            // this should only be needed until we have more accurate and complete data sets
                            if(!date || !open || !high || !low || !close) {
                                console.log('null values found');
                                return;
                            }
                            
                            const updateData = {
                                time: Math.floor(+new Date(date) / 1000),
                                open: open,
                                high: high,
                                low: low,
                                close: close
                            };
    
                            console.log('update: ', updateData);
                            setLastDateReceived(date);
                            
    
                            candleSeries.update(updateData);
                            chart.timeScale().fitContent();
                        }
                        else if (message.meta.updateId === 'strategyOrder') {
                            console.log('strategy order: ', message.data);

                            const order = message.data;

                            candleSeries.setMarkers([{
                                time: Math.floor(+new Date(order.date) / 1000),
                                position: 'aboveBar',
                                color: order.side === 'buy' ? 'green' : 'red',
                                shape: 'arrowUp',
                                text: order.side === 'buy' ? 'B' : 'S',
                            }]);
                        }

                        updateCount++;
                        break;
                    
                    case 'SESSION_COMPLETED':
                        console.log('session completed');
                        break;

                    case 'ERROR':
                        console.log('session error: ', message.data.error);
                        break;
                }

                // console.log(message);
            });

            getBotSession(projectId, sessionId).then(({data}) => {
                setSession(data);
            });
        }

        // unmount
        return () => {
            if(socket) {
                socket.emit('leave_channel', 'BACKTEST_SESSION:*:' + projectId + ',' + sessionId);
            }
        };
    }, [projectId, sessionId, socket, candleSeries]);

    return (
        <>
            {session && <>

                <Grid columns={24}>
                    <Grid.Col span={12}>
                        {/* Session name */}
                        <h3 style={{marginTop: '0'}} onClick={() => {}}>{session.name}</h3>
                    </Grid.Col>
                    <Grid.Col span={12} style={{textAlign: 'right'}}>
                        {/* Buttons/Controls */}
                        <Button color='red' disabled={!session.active} style={{padding: 0}} onClick={() => {
                            // updateBot(project.id, project).then(({data}) => {
                            //     setProject(data);
                            //     setLastUpdated(data.updated_at);
                            //     setBuildVersion(data.algorithm_version);
                            //     // addConsoleLine(setCTConsoleText, ctConsoleText, 'Strategy saved');
                            // });
                            stopBotSession(session, lastDateReceived).then(({data}) => {
                                setSession(data);
                            });
                        }} title="Stop the session"><BiStop size={'md'} /></Button>&nbsp;
                        <Button disabled={session.active} style={{padding: 0}} onClick={() => {
                            // go to live setup page
                            // navigate(`/lab/projects/${projectId}/optimization-setup`);
                            resumeBotSession(session).then(({data}) => {
                                setSession(data);
                            });
                        }} title="Start/resume the session"><BiPlay size={'md'} /></Button>&nbsp;
                        {/* <Button disabled={true} color='green' onClick={() => {
                            // go to live setup page
                            // navigate(`/lab/projects/${projectId}/live-setup`);
                        }}>Go Live &nbsp;<BsLightning /></Button> */}
                    </Grid.Col>
                </Grid>

                {/* TradingView Chart */}
                <LightweightChart containerId="backtest-session" height={500} setupChart={setupChart} />
            </>}
        </>
    )
};

export default Session;