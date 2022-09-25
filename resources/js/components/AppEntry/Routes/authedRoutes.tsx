import React from 'react';

import paths from 'Paths';
import { Dashboard, Laboratory, Settings } from 'Routes/Authed';

import CreateBot from 'Routes/Authed/Laboratory/Bots/Create';
import ViewBot from 'Routes/Authed/Laboratory/Bots/View';
import EditBot from 'Routes/Authed/Laboratory/Bots/Edit';

import CreateAPIKey from 'Routes/Authed/Settings/Api/Create';

import CreateExchangeAccount from 'Routes/Authed/Settings/ExchangeAccounts/Create';

const { authed } = paths;

const labRoutes = [
    { path: authed.laboratory.base, element: <Laboratory /> },
    { path: authed.laboratory.bots.create, element: <CreateBot /> },
    { path: authed.laboratory.bots.view, element: <ViewBot /> },
    { path: authed.laboratory.bots.edit, element: <EditBot /> },  
];

const settingsRoutes = [
    { path: authed.settings.base, element: <Settings /> },
    { path: authed.settings.apiKey.create, element: <CreateAPIKey /> },
    { path: authed.settings.exchangeAccounts.create, element: <CreateExchangeAccount /> },
];

export default [
    { path: authed.dashboard, element: <Dashboard /> },
    ...labRoutes,
    ...settingsRoutes,
];