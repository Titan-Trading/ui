import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';

import DashboardNavbar from './DashboardNavbar';

const DashboardLayout = () => {
    const user = useSelector((store) => store.user);

    return (
        <AppShell
            padding="md"
            navbar={<DashboardNavbar user={user} />}
        >
            <Outlet />
        </AppShell>
    )
};

export default DashboardLayout;