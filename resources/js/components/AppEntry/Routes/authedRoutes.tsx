import React from 'react';

import paths from 'Paths';
import { Dashboard, Laboratory, UserSettings } from 'Routes/Authed';
import CreateAPIKey from 'Routes/Authed/User/Api/Create';
import ViewApiKey from 'Routes/Authed/User/Api/View';
import EditApiKey from 'Routes/Authed/User/Api/Edit';

const { authed } = paths;

export default [
    { path: authed.dashboard, element: <Dashboard /> },
    { path: authed.laboratory, element: <Laboratory /> },
    { path: authed.settings.all, element: <UserSettings /> },
    { path: authed.settings.apiKey.createApiKey, element: <CreateAPIKey /> },
    { path: authed.settings.apiKey.viewApiKey, element: <ViewApiKey /> },
    { path: authed.settings.apiKey.editApiKey, element: <EditApiKey /> },
];