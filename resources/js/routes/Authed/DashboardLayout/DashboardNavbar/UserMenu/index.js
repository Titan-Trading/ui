import React from 'react';
import { BsGear } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { Menu } from '@mantine/core';
import { useDispatch } from 'react-redux';

import { setUser } from '../../../../../redux/user';
import UserButton from './UserButton';

const UserMenu = ({ user }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser({}));
        window.location.reload();
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