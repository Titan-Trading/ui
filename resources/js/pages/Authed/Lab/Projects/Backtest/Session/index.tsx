import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AdvancedChart } from "react-tradingview-embed";
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { getBotSession, getBotSessions } from 'API/botSessions';
import { useSetState } from '@mantine/hooks';
import { getBot } from 'API/bots';
import { isNil } from 'ramda';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useWebSocket } from 'Components/WebSocketContext';
import LightweightChart from 'Components/LightweightChart';


const Session = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId, sessionId } = useParams();
    const { authed } = PATHS;
    const socket = useWebSocket();
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Project builder', href: `/projects/${projectId}`},
        {title: 'Backtest', href: null},
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [session, setSession] = useSetState<any>(null);
    const [ candleSeries, setCandleSeries ] = useState<any>(null);

    const setupChart = (chart: any) => {
        // const rsiSeries = chart.addLineSeries();

        setCandleSeries(chart.addCandlestickSeries());

        // create series for each indicator

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

    useEffect(() => {
        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle(`Project - ${projectId}`));

        if(!isNil(projectId) && !isNil(sessionId) && socket) {
            socket.on('message', (message) => {
                if(message.meta.category !== 'BACKTEST_SESSION') {
                    return;
                }

                switch(message.meta.type) {
                    case 'START_SESSION':
                        break;
                    
                    case 'UPDATE_SESSION':
                        let updateData = [];

                        for(let iD in message.data.marketData) {
                            const data = message.data.marketData[iD];
                            
                            updateData.push({
                                time: +new Date(data.date),
                                open: parseFloat(data.open),
                                high: parseFloat(data.high),
                                low: parseFloat(data.low),
                                close: parseFloat(data.close)
                            });
                        }

                        candleSeries.setData(updateData);
                        break;
                    
                    case 'SESSION_COMPLETED':
                        break;

                    case 'ERROR':
                        break;
                }

                console.log(message);
            });

            getBotSession(projectId, sessionId).then(({data}) => {
                setSession(data);

                socket.emit('join_channel', 'BACKTEST_SESSION:*:' + projectId + ',' + sessionId);
            });
        }
    }, [projectId, sessionId, socket, candleSeries]);

    return (
        <>
            <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs>

            {/* Project name */}
            <h3>{session?.name}</h3>

            {/* TradingView Chart */}
            <LightweightChart containerId="backtest-session" setupChart={setupChart} />
        </>
    )
};

export default Session;