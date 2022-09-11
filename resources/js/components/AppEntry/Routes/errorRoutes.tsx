import React from 'react';

import paths from 'Paths';
import { Error404 } from 'Routes/Error';

const { error } = paths;

export default [
    { path: error.error404, element: <Error404 /> },
    { path: '*', element: <Error404 /> },
];