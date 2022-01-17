import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';

import { setUser } from '../../../redux/user';
import DashboardNavbar from './DashboardNavbar';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser({}));
        window.location.reload();
    };

    return (
        <AppShell
            padding="md"
            navbar={<DashboardNavbar />}
        >
            <Outlet />
        </AppShell>
    )
};

export default DashboardLayout;