import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaDraftingCompass } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import MenuButton from '../../../../../components/Buttons/MenuButton';
import { PATHS } from '../../../../';

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

            <Link to={authed.test}>
                <MenuButton
                    active={pathname === authed.test}
                    icon={<FaDraftingCompass />}
                    text="Test"
                />
            </Link>
        </>
    );
};

export default MainMenu;