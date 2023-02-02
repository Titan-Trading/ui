import React from 'react';
import {
    Dashboard,

    WarRoom,

    Lab,
    Projects,
    ProjectBuilder,
    ProjectTestSetup,
    ProjectTest,
    ProjectOptimizationSetup,
    ProjectOptimization,
    ProjectLiveSetup,
    Indicators,
    IndicatorBuilder,
    IndicatorTestSetup,
    IndicatorTest,

    BootCamp,
    BootCampCourse,
    BootCampLesson,

    LiveTrading,
    LiveTradingSession,

    Marketplace,
    ProductDetail,

    Datasets,
    DatasetDetail,

    Support,
    SupportTicket,

    UserSettings
} from './Authed';
import {
    Login,
    Signup,
    ForgotPassword,
    Home
} from './Guest';
import {
    Error404
} from './Error';
import { FaHome, FaMicroscope, FaStore } from 'react-icons/fa';
import LoginLayout from '../layouts/LoginLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import GuestLayout from '../layouts/GuestLayout';

const PATHS = {
    authed: {
        dashboard: '/',

        /**
         * War room routes
         */
        warRoom: '/war-room',

        /**
         * Laboratory routes
         */
        lab: '/lab',

        // strategies
        projects: '/lab/projects',
        projectBuilder: '/lab/projects/:projectId',
        projectTestSetup: '/lab/projects/:projectId/backtest-setup',
        projectTest: '/lab/projects/:projectId/backtests/:sessionId',
        projectOptimizationSetup: '/lab/projects/:projectId/optimization-setup',
        projectOptimization: '/lab/projects/:projectId/optimizations/:sessionId',
        projectLiveSetup: '/lab/projects/:projectId/live-setup',

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

        /**
         * Boot camp routes
         */
        bootCamp: '/boot-camp',
        course: '/boot-camp/:courseId',
        lesson: '/boot-camp/:courseId/:lessonId',

        /**
         * Live trading routes
         */
        liveTrading: '/live-trading',
        liveTradingSession: '/live-trading/:sessionId',

        /**
         * Marketplace routes
         */
        marketplace: '/marketplace',
        productDetail: '/marketplace/:productId',

        /**
         * Datasets routes
         */
        datasets: '/datasets',
        datasetDetail: '/datasets/:datasetId',

        /**
         * Support routes
         */
        support: '/support',
        supportTicket: '/support/:ticketId',

        /**
         * Settings routes
         */
        settings: '/settings',
        billingSettings: '/settings/billing',
        withdrawalSettings: '/settings/withdrawal',
        exchangeAccountsSettings: '/settings/exchange-accounts',
        apiKeysSettings: '/settings/api-keys',
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

        /**
         * War room routes
         */
        warRoom: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'War Room', href: null}
        ],

        /**
         * Laboratory routes
         */
        lab: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Laboratory', href: null}
        ],

        // strategies
        projects: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'Laboratory', href: `/lab`},
            {icon: null, title: 'Projects', href: null}
        ],
        projectBuilder: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'Laboratory', href: `/lab`},
            {icon: null, title: 'Projects', href: `/lab/projects`},
            {icon: null, title: 'Project builder', href: null}
        ],
        projectTestSetup: [],
        projectTest: [],
        projectOptimizationSetup: [],
        projectOptimization: [],
        projectLiveSetup: [],

        // indicators
        indicators: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'Laboratory', href: `/lab`},
            {icon: null, title: 'Indicators', href: null}
        ],
        indicatorBuilder: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'Laboratory', href: `/lab`},
            {icon: null, title: 'Indicators', href: `/lab/indicators`},
            {icon: null, title: 'Indicator builder', href: null}
        ],
        indicatorTestSetup: [],
        indicatorTest: [],

        // signals
        signals: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'Laboratory', href: `/lab`},
            {icon: null, title: 'Signals', href: null}
        ],
        signalBuilder: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: <FaMicroscope />, title: 'Laboratory', href: `/lab`},
            {icon: null, title: 'Signal builder', href: null}
        ],
        signalTestSetup: [],
        signalTest: [],

        /**
         * Boot camp routes
         */
        bootCamp: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Boot Camp', href: null}
        ],
        course: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Boot Camp', href: `/boot-camp`},
            {icon: null, title: 'Course', href: null}
        ],
        lesson: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Boot Camp', href: `/boot-camp`},
            {icon: null, title: 'Course', href: null},
            {icon: null, title: 'Lesson', href: null}
        ],

        /**
         * Live trading routes
         */
        liveTrading: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Live Trading', href: null}
        ],
        liveTradingSession: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Live Trading', href: `/live-trading`},
            {icon: null, title: 'Session', href: null}
        ],

        /**
         * Marketplace routes
         */
        marketplace: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Marketplace', href: null}
        ],
        productDetail: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: <FaStore />, title: 'Marketplace', href: `/marketplace`},
            {icon: null, title: 'Product detail', href: null}
        ],

        /**
         * Datasets routes
         */
        datasets: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Datasets', href: null}
        ],
        datasetDetail: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Datasets', href: `/datasets`},
            {icon: null, title: 'Dataset detail', href: null}
        ],

        /**
         * Support routes
         */
        support: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Support', href: null}
        ],
        supportTicket: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'Support', href: `/support`},
            {icon: null, title: 'Ticket', href: null}
        ],

        /**
         * User settings routes
         */
        settings: [
            {icon: <FaHome />, title: 'Dashboard', href: `/`},
            {icon: null, title: 'User settings', href: null}
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

    return [
        {
            path: '/',
            element: isAuthed ? <DashboardLayout /> : <GuestLayout />,
            children: isAuthed ? [
                {
                    path: authed.dashboard,
                    element: <Dashboard />
                },

                /**
                 * War room routes
                 */
                {
                    path: authed.warRoom,
                    element: <WarRoom />
                },

                /**
                 * Lab routes
                 */
                {
                    path: authed.lab,
                    element: <Lab />,
                },

                // projects
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
                    path: authed.projectOptimizationSetup,
                    element: <ProjectOptimizationSetup />
                },
                {
                    path: authed.projectOptimization,
                    element: <ProjectOptimization />
                },
                {
                    path: authed.projectLiveSetup,
                    element: <ProjectLiveSetup />
                },

                // indicators
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

                // signals

                /**
                 * Boot camp routes
                 */
                {
                    path: authed.bootCamp,
                    element: <BootCamp />
                },
                {
                    path: authed.course,
                    element: <BootCampCourse />
                },
                {
                    path: authed.lesson,
                    element: <BootCampLesson />
                },

                /**
                 * Live trading routes
                 */
                {
                    path: authed.liveTrading,
                    element: <LiveTrading />
                },
                {
                    path: authed.liveTradingSession,
                    element: <LiveTradingSession />
                },

                /**
                 * Marketplace routes
                 */
                {
                    path: authed.marketplace,
                    element: <Marketplace />
                },
                {
                    path: authed.productDetail,
                    element: <ProductDetail />
                },

                /**
                 * Datasets routes
                 */
                {
                    path: authed.datasets,
                    element: <Datasets />
                },
                {
                    path: authed.datasetDetail,
                    element: <DatasetDetail />
                },

                /**
                 * Support routes
                 */
                {
                    path: authed.support,
                    element: <Support />
                },
                {
                    path: authed.supportTicket,
                    element: <SupportTicket />
                },

                /**
                 * User settings routes
                 */
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