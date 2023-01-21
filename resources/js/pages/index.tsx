import React from 'react';
import {
    Dashboard,
    WarRoom,
    Lab,
    Projects,
    ProjectBuilder,
    ProjectTestSetup,
    ProjectTest,
    Indicators,
    IndicatorBuilder,
    IndicatorTestSetup,
    IndicatorTest,
    BootCamp,
    LiveTrading,
    Marketplace,
    ProductDetail,
    Datasets,
    UserSettings
} from './Authed';
import {
    Login
} from './Guest';
import {
    Error404
} from './Error';
import { FaHome, FaMicroscope, FaStore } from 'react-icons/fa';
import LoginLayout from '../layouts/LoginLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import GuestLayout from '../layouts/GuestLayout';
import Home from './Guest/Home';
import ForgotPassword from './Guest/ForgotPassword';
import Signup from './Guest/Signup';
import Support from './Authed/Support';

const PATHS = {
    authed: {
        dashboard: '/',

        // war room routes
        war_room: '/war-room',

        // lab routes
        lab: '/lab',

        // strategies
        projects: '/lab/projects',
        projectBuilder: '/lab/projects/:projectId',
        projectTestSetup: '/lab/projects/:projectId/backtest-setup',
        projectTest: '/lab/projects/:projectId/backtests/:sessionId',

        // indicators
        indicators: '/lab/indicators',
        indicatorBuilder: '/lab/indicators/:indicatorId',
        indicatorTestSetup: '/lab/indicators/:indicatorId/backtest-setup',
        indicatorTest: '/lab/indicators/:indicatorId/backtests/:testId',

        // signals
        signals: '/lab/signals',
        signalBuilder: '/lab/signals/:signalId',
        signalTestSetup: '/lab/signals/:signalId/backtest-setup',
        signalTest: '/lab/signals/:signalId/backtests/:sessionId',

        // learning boot camp routes
        boot_camp: '/learning',

        // live trading routes
        live_trading: '/live-trading',

        // store
        marketplace: '/marketplace',
        productDetail: '/marketplace/:productId',

        // datasets routes
        datasets: '/datasets',
        datasetDetail: '/datasets/:datasetId',

        support: '/support',

        settings: '/settings'
    },
    guest: {
        home: '/',
        login: '/login',
        signup: '/signup',
        forgotPassword: '/forgot-password'
    }
};

const BREADCRUMBS = {
    authed: {
        dashboard: [],

        // war room routes
        war_room: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'war room', href: null}
        ],

        // lab routes
        lab: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'laboratory', href: null}
        ],

        // strategies
        projects: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'laboratory', href: `/lab`},
            {icon: null, title: 'projects', href: null}
        ],
        projectBuilder: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'laboratory', href: `/lab`},
            {icon: null, title: 'projects', href: `/lab/projects`},
            {icon: null, title: 'project builder', href: null}
        ],
        projectTestSetup: [],
        projectTest: [],

        // indicators
        indicators: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'laboratory', href: `/lab`},
            {icon: null, title: 'indicators', href: null}
        ],
        indicatorBuilder: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'laboratory', href: `/lab`},
            {icon: null, title: 'indicators', href: `/lab/indicators`},
            {icon: null, title: 'indicator builder', href: null}
        ],
        indicatorTestSetup: [],
        indicatorTest: [],

        // signals
        signals: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'laboratory', href: `/lab`},
            {icon: null, title: 'signals', href: null}
        ],
        signalBuilder: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'laboratory', href: `/lab`},
            {icon: null, title: 'signal builder', href: null}
        ],
        signalTestSetup: [],
        signalTest: [],

        // learning boot camp routes
        boot_camp: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'boot camp', href: null}
        ],

        // live trading routes
        live_trading: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'live trading', href: null}
        ],

        // store
        marketplace: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'marketplace', href: null}
        ],
        productDetail: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: <FaStore />, title: 'marketplace', href: `/marketplace`},
            {icon: null, title: 'product detail', href: null}
        ],

        // datasets routes
        datasets: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'datasets', href: null}
        ],

        // support routes
        support: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'support', href: null}
        ],

        // user settings
        settings: [
            {icon: <FaHome />, title: 'dashboard', href: `/`},
            {icon: null, title: 'user settings', href: null}
        ],
    },
    guest: {
        home: [],
        login: [],
        signup: [],
        forgotPassword: []
    }
};

const { authed, guest } = PATHS;

const routes = (isAuthed: boolean) => {

    // switch()

    return [
        {
            path: '/',
            element: isAuthed ? <DashboardLayout /> : <GuestLayout />,
            children: isAuthed ? [
                {
                    path: authed.dashboard,
                    element: <Dashboard />
                },
                {
                    path: authed.war_room,
                    element: <WarRoom />
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
                    path: authed.projectTestSetup,
                    element: <ProjectTestSetup />
                },
                {
                    path: authed.projectTest,
                    element: <ProjectTest />
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
                    path: authed.boot_camp,
                    element: <BootCamp />
                },
                {
                    path: authed.live_trading,
                    element: <LiveTrading />
                },
                {
                    path: authed.marketplace,
                    element: <Marketplace />
                },
                {
                    path: authed.productDetail,
                    element: <ProductDetail />
                },
                {
                    path: authed.datasets,
                    element: <Datasets />
                },
                {
                    path: authed.support,
                    element: <Support />
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
                    path: guest.home,
                    element: <Home />
                },
                {
                    path: '*',
                    element: <Error404 />
                }
            ]
        },
        {
            path: '/login',
            element: <LoginLayout />,
            children: [
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
            path: '/forgot-password',
            element: <LoginLayout />,
            children: [
                {
                    path: guest.forgotPassword,
                    element: <ForgotPassword />
                },
                {
                    path: '*',
                    element: <Error404 />
                }
            ]
        },
        {
            path: '/signup',
            element: <LoginLayout />,
            children: [
                {
                    path: guest.signup,
                    element: <Signup />
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
};

export { PATHS, BREADCRUMBS };
export default routes;