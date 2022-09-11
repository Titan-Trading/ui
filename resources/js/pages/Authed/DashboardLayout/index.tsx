import React from 'react';
import { useSelector } from 'react-redux';
import { AppShell, Box, Title, Breadcrumbs, Anchor } from '@mantine/core';

import DashboardNavbar from './DashboardNavbar';

interface IDashboardLayout {
    children: any;
}

const DashboardLayout = ({ children }: IDashboardLayout) => {
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
            {children}
        </AppShell>
    )
};

export default DashboardLayout;