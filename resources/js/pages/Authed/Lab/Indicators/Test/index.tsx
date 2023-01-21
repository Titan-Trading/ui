import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { useSetState } from '@mantine/hooks';
import { getIndicator } from 'API/indicators';
import { isNil } from 'ramda';
import { Anchor, Breadcrumbs, Text } from '@mantine/core';
import { getIndicatorTest } from 'API/indicatorTest';
import LightweightChart from 'Components/LightweightChart';
import { useWebSocket } from 'Components/WebSocketContext';
import { Socket } from 'socket.io-client';
import { Link } from 'react-router-dom';


const TestIndicator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { indicatorId, testId } = useParams();
    const { authed } = PATHS;
    const socket = useWebSocket();
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: `/lab`},
        {title: 'Indicator builder', href: `/lab/indicators/${indicatorId}`},
        {title: 'Test', href: null},
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [indicator, setIndicator] = useSetState<any>(null);
    const [indicatorTest, setIndicatorTest] = useSetState<any>(null);

    // load indicator details from api
    useEffect(() => {
        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle(`Indicator - ${indicatorId}`));

        if(!isNil(indicatorId)) {
            getIndicator(parseInt(indicatorId)).then(({data}) => {
                setIndicator(data);
            });
        }

        if(!isNil(indicatorId) && !isNil(testId)) {
            getIndicatorTest(parseInt(indicatorId), parseInt(testId)).then(({data}) => {
                setIndicatorTest(data);
            });
        }
    }, []);


    const setupChart = (chart: any) => {
        const candleSeries = chart.addCandlestickSeries();
        const rsiSeries    = chart.addLineSeries();

        candleSeries.setData([
            {time: 1556877600, open: 456, high: 460, low: 456, close: 458},
            {time: 1556881200, open: 458, high: 500, low: 458, close: 480},
            {time: 1556884800, open: 480, high: 600, low: 480, close: 590}
        ]);

        rsiSeries.setData([
            {time: 1556877600, value: 458},
            {time: 1556881200, value: 480},
            {time: 1556884800, value: 590}
        ]);
    };

    return (
        <>
            <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs>

            {indicator && <>
                {/* Indicator name */}
                <h3>{indicator?.name}</h3>

                {/* TradingView Chart */}
                <LightweightChart containerId="indicator-test" setupChart={setupChart} />
            </>}
        </>
    )
};

export default TestIndicator;