import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';

import Authed from '../../routes/Authed';
import Guest from '../../routes/Guest';

const AppEntry = () => {
    const user = useSelector((store) => store.user);

    return isEmpty(user) ? <Authed /> : <Guest />;
};

export default AppEntry;