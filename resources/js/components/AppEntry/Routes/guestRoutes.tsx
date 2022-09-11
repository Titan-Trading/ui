import React from 'react';

import paths from 'Paths';
import { Login } from 'Routes/Guest';

const { guest } = paths;

export default [
    { path: guest.login, element: <Login /> },
];