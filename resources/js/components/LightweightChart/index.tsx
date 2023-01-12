import React, { useState, useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const LightweightChart = (props: any) => {
    let chart = null;

    useEffect(() => {
        chart = createChart(props.containerId, {
            width: 800,
            height: 300,
            timeScale: {
                timeVisible: true
            }
        });

        props.setupChart(chart);
    }, []);

    return <>
        <div id={props.containerId} className='lightweight-chart'></div>
    </>;
};

export default LightweightChart;