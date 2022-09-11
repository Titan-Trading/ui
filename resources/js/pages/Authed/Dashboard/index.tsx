import React, { useEffect } from 'react';
import { Title } from '@mantine/core';
import { useDispatch } from 'react-redux';

import { setTitle } from 'Redux/layout';

const Dashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Dashboard'));
    }, []);

    return <></>
};

export default Dashboard;