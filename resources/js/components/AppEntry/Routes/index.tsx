import React from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isNil } from 'ramda';

import paths from 'Paths';
import authedRoutes from './authedRoutes';
import guestRoutes from './guestRoutes';
import errorRoutes from './errorRoutes';

import DashboardLayout from 'Routes/Authed/DashboardLayout';
import GuestLayout from 'Routes/Guest/GuestLayout';

const Routes = () => {
    const user = useSelector((store: any) => store.user);

    return (
        <Switch>
            {!isNil(user) ? (
                <Route element={<DashboardLayout />}>
                    {authedRoutes.map((props, i) => <Route index={i === 0} key={i} {...props} />)}
                    <Route path="*" element={<Navigate to={paths.authed.dashboard} />} />
                </Route>
            ) : (
                <Route element={<GuestLayout />}>
                    {guestRoutes.map((props, i) => <Route index={i === 0} key={i} {...props} />)}
                    <Route path="*" element={<Navigate to={paths.guest.login} />} />
                </Route>
            )}
            {errorRoutes.map((props, i) => <Route key={i} {...props} />)}
        </Switch>
    )
};

export default Routes;