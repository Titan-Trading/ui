import React from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'
import { isNil } from 'ramda';

import routes from '../../routes';

const AppEntry = () => {
    const user = useSelector((store) => store.user);
    const routing = useRoutes(routes(!isNil(user)));

    return routing;
};

export default AppEntry;