import React, { useEffect } from 'react';
import { Title } from '@mantine/core';
import { useDispatch } from 'react-redux';

import { setTitle } from 'Redux/layout';
import DashboardLayout from '../DashboardLayout';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Dashboard'));
    }, []);

    return (
        <DashboardLayout>
            <Title>Hi :)</Title>
        </DashboardLayout>
    )
};

export default Dashboard;