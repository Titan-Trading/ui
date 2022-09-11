import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppShell, Box, Title, Breadcrumbs, Anchor } from '@mantine/core';
import { Outlet, useLocation } from 'react-router-dom';

import { setTitle } from 'Redux/layout';

import DashboardNavbar from './DashboardNavbar';

const DashboardLayout = () => {
    const location = useLocation();
    const user = useSelector((store: any) => store.user);
    const { title, breadcrumbs } = useSelector((store: any) => store.layout);
    const dispatch = useDispatch();

    // TODO: spend time to find an automatic way to work with breadcrumbs
    
    const updateTitle = (pathname: string) => {
        if (pathname.includes('/settings')) {
            dispatch(setTitle('Settings'));
        }
    };

    useEffect(() => {
        if (!location.pathname) return;
        updateTitle(location.pathname);
    }, [ location ]);

    return (
        <AppShell
            padding="xl"
            navbar={<DashboardNavbar user={user} />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colors.gray[0] },
            })}
        >
            <Box
                sx={(theme) => ({
                    backgroundColor: 'white',
                    padding: theme.spacing.md,
                    marginBottom: '50px'
                })}
            >
                {/* change back to 15px when we have breadcrumbs */}
                <Title style={{ marginBottom: '0' }}>{title}</Title>
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumbs>
                        {breadcrumbs.map((b, i) => (
                            <Anchor href={b.href} key={i}>
                                {b.title}
                            </Anchor>
                        ))}
                    </Breadcrumbs>
                )}
                
            </Box>
            <Outlet />
        </AppShell>
    )
};

export default DashboardLayout;