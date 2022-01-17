import React from 'react';
import { MantineProvider } from '@mantine/core';
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
                    'green': [ '#2A9D8F' ],
                    'orange': [ '#E9C46A' ],
                    'brick-red': ['#fefefe']
                },
                spacing: { xs: 10, sm: 12, md: 16, lg: 20, xl: 24 },
            }}
        >
            {routing}
        </MantineProvider>
    );
};

export default AppEntry;