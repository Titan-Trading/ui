import React, { useState } from 'react';
import { SegmentedControl, Box } from '@mantine/core';

import {
    Account,
    API,
    Profile
} from './SettingsPages';

const UserSettings = () => {
    const [ tab, setTab ] = useState(1);
    const settingsPages = [
        <Profile />,
        <Account />,
        <API />
    ];

    return (
        <>
            <SegmentedControl 
                size="lg"
                fullWidth
                value={tab}
                onChange={setTab}
                color="blue"
                data={[
                    { label: 'Profile Settings', value: 1 },
                    { label: 'Account Settings', value: 2 },
                    { label: 'API Keys', value: 3 }
                ]}
            />
            <Box
                sx={(theme) => ({
                    paddingTop: '75px'
                })}
            >
                {settingsPages[tab - 1]}
            </Box>
        </>
    )
};

export default UserSettings;