import React, { useState } from 'react';
import { SegmentedControl, Box } from '@mantine/core';

import ApiKeys from './Api';
import ExchangeAccounts from './ExchangeAccounts';

const Settings = () => {
    const [ tab, setTab ] = useState<string>('1');
    const settingsPages = [
        <ApiKeys key={0} />,
        <ExchangeAccounts key={1} />
    ];

    return (
        <>
            <SegmentedControl 
                size="lg"
                fullWidth
                value={tab}
                onChange={setTab}
                color="cyan"
                data={[
                    { label: 'API Keys', value: '1' },
                    { label: 'Exchange Accounts', value: '2' }
                ]}
            />
            <Box styles={{ paddingTop: '75px' }}>
                {settingsPages[parseInt(tab) - 1]}
            </Box>
        </>
    );
};

export default Settings;