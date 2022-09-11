import React, { useEffect, useState } from 'react';
import { SegmentedControl, Box } from '@mantine/core';
import { useDispatch } from 'react-redux';

import ApiKeys from './Api';
import ExchangeAccounts from './ExchangeAccounts';
import { setTitle } from 'Redux/layout';

const UserSettings = () => {
    const dispatch = useDispatch();
    const [ tab, setTab ] = useState<string>('1');
    const settingsPages = [
        <ApiKeys key={0} />,
        <ExchangeAccounts key={1} />
    ];

    useEffect(() => {
        dispatch(setTitle('Settings'));
    }, []);

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
    );
};

export default UserSettings;