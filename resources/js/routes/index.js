import React from 'react';
import { Navigate } from 'react-router-dom';

import { 
    DashboardLayout,
    Dashboard,
    AuthedTest,
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
        dashboard: '/dashboard',
        test: '/test',
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

const routes = isAuthed => [
    {
        path: '/',
        element: isAuthed ? <DashboardLayout /> : <Navigate to={guest.login} />,
        children: [
            {
                path: authed.dashboard,
                element: <Dashboard />
            },
            {
                path: authed.test,
                element: <AuthedTest />
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