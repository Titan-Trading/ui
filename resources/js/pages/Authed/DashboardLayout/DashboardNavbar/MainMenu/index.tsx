import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaDraftingCompass } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import MenuButton from 'Components/Buttons/MenuButton';
import paths from 'Paths';

const MainMenu = () => {
    const { pathname } = useLocation();
    const { authed } = paths;

    return (
        <>
            <Link to={authed.dashboard}>
                <MenuButton
                    active={pathname === authed.dashboard}
                    icon={<AiFillDashboard />}
                    text="Dashboard"
                />
            </Link>
            <Link to={authed.laboratory}>
                <MenuButton
                    active={pathname === authed.laboratory}
                    icon={<FaDraftingCompass />}
                    text="Laboratory"
                />
            </Link>
        </>
    );
};

export default MainMenu;