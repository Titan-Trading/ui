import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AppShell, Box, Title, Breadcrumbs, Anchor } from '@mantine/core';

import { setUser } from '../../../redux/user';

import './style.scss';

const DashboardLayout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser({}));
        window.location.reload();
    };

    const items = [
        { title: 'Mantine', href: 'https://mantine.dev' },
        { title: 'Mantine hooks', href: 'https://mantine.dev/hooks/getting-started' },
        { title: 'use-id', href: 'https://mantine.dev/hooks/use-id' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

    return (
        <AppShell
            padding="xl"
            navbar={<DashboardNavbar user={user} />}
        >
            <Box
                sx={(theme) => ({
                    backgroundColor: theme.colors.gray[0],
                    padding: theme.spacing.md,
                    marginBottom: '50px'
                })}
            >
                <Title style={{ marginBottom: '15px' }}>Page Title</Title>
                <Breadcrumbs>
                    {items}
                </Breadcrumbs>
            </Box>
            <Outlet />
        </AppShell>
    )
};

export default DashboardLayout;