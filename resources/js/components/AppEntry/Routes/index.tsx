import React, { useEffect, useState } from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isNil } from 'ramda';

import paths from 'Paths';
import authedRoutes from './authedRoutes';
import guestRoutes from './guestRoutes';
import errorRoutes from './errorRoutes';

const Routes = () => {
    const [ authed, setAuthed ] = useState<boolean>(false);
    const user = useSelector((store: any) => store.user);
    
    useEffect(() => {
        if (!isNil(user)) setAuthed(true);
    }, [ user ]);

    return (
        <Switch>
            {authed ? (
                <>
                    {authedRoutes.map((props, i) => <Route key={i} {...props} />)}
                    <Route path="/" element={<Navigate to={paths.authed.dashboard} />} />
                </>
            ) : (
                <>
                    {guestRoutes.map((props, i) => <Route key={i} {...props} />)}
                    <Route path="/" element={<Navigate to={paths.guest.login} />} />
                </>
            )}
            {errorRoutes.map((props, i) => <Route key={i} {...props} />)}
        </Switch>
    )
};

export default Routes;