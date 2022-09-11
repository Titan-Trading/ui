import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppShell, Box, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import DashboardNavbar from './DashboardNavbar';

const DashboardLayout = () => {
    const user = useSelector((store: any) => store.user);
    const { title } = useSelector((store: any) => store.layout)

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
                {/* change back to 15px when we have breadcrumbs */}
                <Title style={{ marginBottom: '0' }}>{title}</Title>
                {/* <Breadcrumbs>
                    {items}
                </Breadcrumbs> */}
            </Box>
            <Outlet />
        </AppShell>
    )
};

export default DashboardLayout;