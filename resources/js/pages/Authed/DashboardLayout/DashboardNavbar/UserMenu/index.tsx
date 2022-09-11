import React from 'react';
import { BsGear } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { Menu } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from 'Redux/user';
import UserButton from './UserButton';
import paths from 'Paths';

interface IUserMenu {
    user: any;
}

const UserMenu = ({ user }: IUserMenu) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authed } = paths;

    const handleLogout = () => {
        dispatch(setUser({}));
    };

    return (
        <Menu
            withArrow
            position="right"
            placement="end"
            control={<UserButton user={user} />}
            sx={(theme) => ({
                width: '100%',
                marginTop: theme.spacing.xl
            })}
        >
            <Menu.Item
                icon={<BsGear />}
                onClick={() => navigate(authed.settings.base)}
            >
                Settings
            </Menu.Item>

            <Menu.Item
                icon={<AiOutlineLogout />}
                onClick={() => handleLogout()}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
};

export default UserMenu;