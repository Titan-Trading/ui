import React from 'react';
import { BsGear } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { Menu } from '@mantine/core';

import UserButton from './UserButton';

const UserMenu = () => {
    return (
        <Menu
            withArrow
            placement="center"
            control={<UserButton />}
        >
            <Menu.Item
                icon={<BsGear />}
                onClick={() => console.log('Hello')}
            >
                Settings
            </Menu.Item>
            <Menu.Item
                icon={<AiOutlineLogout />}
            >
                Logout
            </Menu.Item>
        </Menu>
    );
};

export default UserMenu;