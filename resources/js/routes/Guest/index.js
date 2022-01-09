import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './login';

import { routes } from '../';

const Guest = () => {
    return (
        <Routes>
            <Route exact path={routes.guest.login} component={() => <Login />} />
            <Navigate exact to={routes.guest.login} />
        </Routes>
    );
};

export default Guest;