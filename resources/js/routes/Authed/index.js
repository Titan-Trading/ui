import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './Dashboard';

import { routes } from '../';

const Authed = () => {
    return (
        <Routes>
            <Route exact path={routes.authed.dashboard} component={() => <Dashboard />} />
            <Navigate exact to={routes.authed.dashboard} />
        </Routes>
    );
};

export default Authed;