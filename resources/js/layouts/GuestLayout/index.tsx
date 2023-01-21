import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Box, Title, Text, Space } from '@mantine/core';
import { PATHS } from 'Routes/index';
import Compass from 'Images/compass.jpg';

import './style.scss';

const GuestLayout = () => {
    const userStore = useSelector((store: any) => store.user);
    const { guest, authed } = PATHS;
    const navigate = useNavigate();

    useEffect(() => {
        if(userStore) {
            navigate(authed.dashboard);
            return;
        }
    }, []);

    return (
        <Outlet />
    );
};

export default GuestLayout;