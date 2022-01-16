import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { setUser } from '../../../redux/user';

import './style.scss';

const DashboardLayout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser({}));
        window.location.reload();
    };

    return (
        <>
            <header>
                <button onClick={() => handleLogout()}>Log Out</button>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
};

export default DashboardLayout;