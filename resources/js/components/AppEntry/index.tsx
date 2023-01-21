import React, { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { setUser } from 'Redux/user';
import { isNil } from 'ramda';
import { PATHS } from 'Paths';
import routes from 'Paths';

const AppEntry = () => {
    const userStore = useSelector((store: any) => store.user);
    const { guest, authed } = PATHS;
    const routing = useRoutes(routes(!isNil(userStore)));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
        // auto logout (on reload)
        // const currentTime = Math.floor((new Date()).getTime() / 1000);
        // if(userStore && userStore.user && userStore.user.metadata && currentTime > userStore.user.metadata.exp) {
        //     dispatch(setUser({}));
        //     navigate(guest.login);
        //     return;
        // }
    // }, []);

    return (
        <MantineProvider
            theme={{
                colorScheme: 'dark',
                fontFamily: 'Oxygen, sans serif',
                colors: {
                    'charcoal': [ '#5e727c', '#264653' ],
                    'customGreen': [ '#2A9D8F' ],
                    'orange': [ '#E9C46A' ],
                    'customRed': [ '#fefefe' ],

                    // override dark colors to change them for all components
                    // dark: [
                    //     '#d5d7e0',
                    //     '#acaebf',
                    //     '#8c8fa3',
                    //     '#666980',
                    //     '#4d4f66',
                    //     '#34354a',
                    //     '#2b2c3d',
                    //     '#1d1e30',
                    //     '#0c0d21',
                    //     '#01010a'
                    // ]
                },
                spacing: { xs: 10, sm: 12, md: 16, lg: 20, xl: 24 },
            }}
            withGlobalStyles
            withNormalizeCSS
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