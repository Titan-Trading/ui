import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AppShell, Box, Title, Breadcrumbs, Anchor } from '@mantine/core';

import DashboardNavbar from './DashboardNavbar';
import { useDispatch } from 'react-redux';
import { setTest } from '../../../redux/test'

const DashboardLayout = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const items = [
        { title: 'Mantine', href: 'https://mantine.dev' },
        { title: 'Mantine hooks', href: 'https://mantine.dev/hooks/getting-started' },
        { title: 'use-id', href: 'https://mantine.dev/hooks/use-id' },
      ].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ));

    const updateName = () => {
        dispatch(setTest('Another Name'))
    };

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
                <Title onClick={() => updateName()} style={{ marginBottom: '15px' }}>Page Title</Title>
                <Breadcrumbs>
                    {items}
                </Breadcrumbs>
            </Box>
            <Outlet />
        </AppShell>
    )
};

export default DashboardLayout;