import React from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import Routes from './Routes';

const AppEntry = () => {

    return (
        <MantineProvider
            theme={{
                fontFamily: 'Oxygen, sans serif',
                colors: {
                    'charcoal': [ '#5e727c', '#264653' ],
                    'customGreen': [ '#2A9D8F' ],
                    'orange': [ '#E9C46A' ],
                    'customRed': [ '#fefefe' ]
                },
                spacing: { xs: 10, sm: 12, md: 16, lg: 20, xl: 24 },
            }}
        >
            <NotificationsProvider
                position="top-right" 
                zIndex={1985}
            >
                <Routes />
            </NotificationsProvider>
        </MantineProvider>
    );
};

export default AppEntry;