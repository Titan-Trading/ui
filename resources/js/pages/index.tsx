import React from 'react';
import { 
    DashboardLayout,
    Dashboard,
    Lab,
    Projects,
    ProjectBuilder,
    BacktestSetup,
    Indicators,
    IndicatorBuilder,
    IndicatorTestSetup,
    IndicatorTest,
    Session,
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

        // lab routes
        lab: '/lab',

        // strategies
        projects: '/projects',
        projectBuilder: '/projects/:projectId',
        backtestSetup: '/projects/:projectId/backtest-setup',
        session: '/projects/:projectId/backtests/:sessionId',

        // indicators
        indicators: '/indicators',
        indicatorBuilder: '/indicators/:indicatorId',
        indicatorTestSetup: '/indicators/:indicatorId/test-setup',
        indicatorTest: '/indicators/:indicatorId/tests/:testId',

        // learning boot camp routes
        boot_camp: '/learning',

        settings: '/settings'
    },
    guest: {
        home: '/',
        login: '/login'
    }
};

const { authed, guest } = PATHS;

const routes = (isAuthed: boolean) => [
    {
        path: '/',
        element: isAuthed ? <DashboardLayout /> : <GuestLayout />,
        children: isAuthed ? [
            {
                path: authed.dashboard,
                element: <Dashboard />
            },
            {
                path: authed.lab,
                element: <Lab />,
            },
            {
                path: authed.projects,
                element: <Projects />
            },
            {
                path: authed.projectBuilder,
                element: <ProjectBuilder />
            },
            {
                path: authed.backtestSetup,
                element: <BacktestSetup />
            },
            {
                path: authed.session,
                element: <Session />
            },
            {
                path: authed.indicators,
                element: <Indicators />
            },
            {
                path: authed.indicatorBuilder,
                element: <IndicatorBuilder />
            },
            {
                path: authed.indicatorTestSetup,
                element: <IndicatorTestSetup />
            },
            {
                path: authed.indicatorTest,
                element: <IndicatorTest />
            },
            {
                path: authed.settings,
                element: <UserSettings />,
            },
            {
                path: '*',
                element: <Error404 />
            }
        ] : [
            {
                path: guest.login,
                element: <Login />
            },
            {
                path: '*',
                element: <Error404 />
            }
        ]
    },
    {
        path: '*',
        element: <Error404 />
    }
];

export { PATHS };
export default routes;