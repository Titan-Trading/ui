import React, { useState, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

interface IProps {
    containerId: string;
    setupChart: (chart: any) => void;
    width?: number;
    height: number;
}

const LightweightChart = (props: IProps) => {
    let chart = null;

    useEffect(() => {
        chart = createChart(props.containerId, {
            // width: props.width,
            height: props.height,
            timeScale: {
                timeVisible: true
            },
        });

        props.setupChart(chart);
    }, []);

    return <>
        <div id={props.containerId} className='lightweight-chart'></div>
    </>;
};

export default LightweightChart;