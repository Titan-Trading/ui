import React from 'react';
import { Divider, Navbar } from '@mantine/core';

import Brand from './Brand';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

const DashboardNavbar = () => {
    return (
        <Navbar padding="xs" width={{ base: 300 }}>
            <Navbar.Section>
                <Brand />
                <Divider />
            </Navbar.Section>

            <Navbar.Section grow mt="lg">
                <MainMenu />
            </Navbar.Section>

            <Navbar.Section>
                <Divider />
                <UserMenu />
            </Navbar.Section>
        </Navbar>
    )
};

export default DashboardNavbar;