import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import { PATHS } from '../..';

const Dashboard = () => {
    return (
        <>
            <h1>Dashboard</h1>
            <Link to={PATHS.authed.test}>
                Authed Test
            </Link>
        </>
    )
};

export default Dashboard;