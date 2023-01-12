import React, { useEffect } from 'react';
import { Grid, Title } from '@mantine/core';
import { useDispatch } from 'react-redux';

import { setTitle } from 'Redux/layout';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Dashboard'));
    }, []);

    return (
        <Grid columns={24}>
            <Grid.Col span={12}>1</Grid.Col>
            <Grid.Col span={6}>2</Grid.Col>
            <Grid.Col span={6}>3</Grid.Col>
        </Grid>
    );
};

export default Dashboard;