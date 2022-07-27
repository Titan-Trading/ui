import React from 'react';
import { Divider, Navbar } from '@mantine/core';

import Brand from './Brand';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

interface IDashboardNavbar {
    user: any;
}

const DashboardNavbar = ({ user }: IDashboardNavbar) => {
    return (
        <Navbar 
            width={{ base: 300 }} 
            sx={(theme) => ({
                padding: theme.spacing.md,
            })}
        >
            <Navbar.Section>
                <Brand />
                <Divider />
            </Navbar.Section>

            <Navbar.Section grow mt="lg">
                <MainMenu />
            </Navbar.Section>

            <Navbar.Section>
                <Divider />
                <UserMenu user={user} />
            </Navbar.Section>
        </Navbar>
    )
};

export default DashboardNavbar;