import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaDraftingCompass } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import MenuButton from 'Components/Buttons/MenuButton';
import { PATHS } from 'Paths';

const MainMenu = () => {
    const { pathname } = useLocation();
    const { authed } = PATHS;

    return (
        <>
            <Link to={authed.dashboard}>
                <MenuButton
                    active={pathname === authed.dashboard}
                    icon={<AiFillDashboard />}
                    text="Dashboard"
                />
            </Link>

            <Link to={authed.lab_dashboard}>
                <MenuButton
                    active={pathname === authed.lab_dashboard}
                    icon={<FaDraftingCompass />}
                    text="Laboratory"
                />
            </Link>
        </>
    );
};

export default MainMenu;