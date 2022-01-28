import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'
import { isNil } from 'ramda';

import routes from '../../routes';

const AppEntry = () => {
    const user = useSelector((store) => store.user);
    const routing = useRoutes(routes(!isNil(user)));

    return (
        <MantineProvider
            theme={{
                fontFamily: 'Oxygen, sans serif',
                colors: {
                    'charcoal': [ '#5e727c', '#264653' ],
                    'customGreen': [ '#2A9D8F' ],
                    'orange': [ '#E9C46A' ],
                    'customRed': ['#fefefe']
                },
                spacing: { xs: 10, sm: 12, md: 16, lg: 20, xl: 24 },
            }}
        >
            <NotificationsProvider
                position="top-right" 
                zIndex={1985}
            >
                <ModalsProvider>
                    {routing}
                </ModalsProvider>
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default AppEntry;