import React, { useState } from 'react';
import { SegmentedControl, Box } from '@mantine/core';

import API from './API';
import ExchangeAccounts from './ExchangeAccounts';

const UserSettings = () => {
    const [ tab, setTab ] = useState<string>('1');
    const settingsPages = [
        <API key={0} />,
        <ExchangeAccounts key={1} />
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
                    { label: 'API Keys', value: '1' },
                    { label: 'Exchange Accounts', value: '2' }
                ]}
            />
            <Box styles={{ paddingTop: '75px' }}>
                {settingsPages[parseInt(tab) - 1]}
            </Box>
        </>
    )
};

export default UserSettings;