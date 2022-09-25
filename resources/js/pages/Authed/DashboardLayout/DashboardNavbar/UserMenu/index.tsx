import React from 'react';
import { BsGear } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { Menu } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from 'Redux/user';
import UserButton from './UserButton';
import paths from 'Paths';

import './styles.scss';

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
            width={200}
            className="user-menu"
            offset={25}
        >
            <Menu.Target>
                <UserButton user={user} />
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item icon={<BsGear />} onClick={() => navigate(authed.settings.base)}>
                    Settings
                </Menu.Item>
                <Menu.Item icon={<AiOutlineLogout />} onClick={() => handleLogout()}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
            
        </Menu>
    );
};

export default UserMenu;