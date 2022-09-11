import React from 'react';

import paths from 'Paths';
import { Dashboard, Laboratory, UserSettings } from 'Routes/Authed';

const { authed } = paths;

export default [
    { path: authed.dashboard, element: <Dashboard /> },
    { path: authed.laboratory, element: <Laboratory /> },
    { path: authed.settings.all, element: <UserSettings /> },
];