import Dashboard from './Dashboard';
import WarRoom from './WarRoom';
import Lab from './Lab';
import Projects from './Lab/Projects';
import ProjectBuilder from './Lab/Projects/Builder';
import ProjectTestSetup from './Lab/Projects/Builder/setup';
import ProjectTest from './Lab/Projects/Backtest/Session';
import ProjectOptimizationSetup from './Lab/Projects/Optimization/setup';
import ProjectOptimization from './Lab/Projects/Optimization/Session';
import ProjectLiveSetup from './Lab/Projects/Live/setup';
import Indicators from './Lab/Indicators';
import IndicatorBuilder from './Lab/Indicators/Builder';
import IndicatorTestSetup from './Lab/Indicators/Builder/setup';
import IndicatorTest from './Lab/Indicators/Test';
import BootCamp from './BootCamp';
import BootCampCourse from './BootCamp/BootCampCourse';
import BootCampLesson from './BootCamp/BootCampLesson';
import LiveTrading from './LiveTrading';
import LiveTradingSession from './LiveTrading/Session';
import Marketplace from './Marketplace';
import ProductDetail from './Marketplace/ProductDetail';
import Datasets from './Datasets';
import DatasetDetail from './Datasets/DatasetDetail';
import Support from './Support';
import SupportTicket from './Support/Ticket';
import UserSettings from './UserSettings';

export {
    // dashboard components
    Dashboard,

    // war room components
    WarRoom,

    // lab components
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

    // boot camp components
    BootCamp,
    BootCampCourse,
    BootCampLesson,
    
    // live trading components
    LiveTrading,
    LiveTradingSession,

    // store components
    Marketplace,
    ProductDetail,

    // datasets components
    Datasets,
    DatasetDetail,

    Support,
    SupportTicket,

    // user settings components
    UserSettings
};