import React from 'react';
import { Navigate } from 'react-router-dom';

import { 
    DashboardLayout,
    Dashboard,
    Laboratory,
    UserSettings
} from './Authed';

import {
    GuestLayout,
    Login
} from './Guest';

import {
    Error404
} from './Error';

const PATHS = {
    authed: {
        dashboard: '/',
        laboratory: '/laboratory',
        settings: '/settings' //TODO change to /userId/settings
    },
    guest: {
        login: '/login'
    },
    error: {
        error404: '/404'
    }
};

const { authed, guest, error } = PATHS;

const routes = (isAuthed: boolean) => [
    {
        path: '/',
        element: isAuthed ? <DashboardLayout /> : <Navigate to={guest.login} />,
        children: [
            {
                path: authed.dashboard,
                element: <Dashboard />
            },
            {
                path: authed.laboratory,
                element: <Laboratory />,
            },
            {
                path: authed.settings,
                element: <UserSettings />,
            }
        ]
    },
    {
        path: '/',
        element: !isAuthed ? <GuestLayout /> : <Navigate to={authed.dashboard} />,
        children: [
            { path: 'login', element: <Login /> },
            { path: '/', element: <Navigate to={guest.login} /> },
        ],
    },
    {
        path: '*',
        element: <Error404 />
    },
    {
        path: error.error404,
        element: <Error404 />
    }
];

export { PATHS };
export default routes;