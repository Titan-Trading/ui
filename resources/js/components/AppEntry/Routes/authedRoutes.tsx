import React from 'react';

import paths from 'Paths';
import { Dashboard, Laboratory, Settings } from 'Routes/Authed';

import CreateAPIKey from 'Routes/Authed/Settings/Api/Create';
import ViewApiKey from 'Routes/Authed/Settings/Api/View';
import EditApiKey from 'Routes/Authed/Settings/Api/Edit';

import CreateExchangeAccount from 'Routes/Authed/Settings/ExchangeAccounts/Create';

const { authed } = paths;

const labRoutes = [
    { path: authed.laboratory.base, element: <Laboratory /> },
];

const settingsRoutes = [
    { path: authed.settings.base, element: <Settings /> },
    { path: authed.settings.apiKey.create, element: <CreateAPIKey /> },
    { path: authed.settings.apiKey.view, element: <ViewApiKey /> },
    { path: authed.settings.apiKey.edit, element: <EditApiKey /> },
    { path: authed.settings.exchangeAccounts.create, element: <CreateExchangeAccount /> },
];

export default [
    { path: authed.dashboard, element: <Dashboard /> },
    ...labRoutes,
    ...settingsRoutes
];