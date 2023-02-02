import React, { useEffect, useState } from 'react';
import { SegmentedControl, Box } from '@mantine/core';
import { useDispatch } from 'react-redux';

import API from './API';
import ExchangeAccounts from './ExchangeAccounts';
import { setTitle } from 'Redux/layout';
import Billing from './Billing';
import General from './General';
import Withdraw from './Withdraw';

const UserSettings = () => {
    const dispatch = useDispatch();
    const [ tab, setTab ] = useState<string>('1');
    const settingsPages = [
        <General key={0} />,
        <Billing key={1} />,
        <Withdraw key={2} />,
        <ExchangeAccounts key={3} />,
        <API key={4} />
    ];

    useEffect(() => {
        dispatch(setTitle('User settings'));
    }, []);

    return (
        <>
            <SegmentedControl 
                size="sm"
                fullWidth
                value={tab}
                onChange={setTab}
                // color="blue"
                data={[
                    { label: 'General', value: '1' },
                    { label: 'Billing', value: '2' },
                    { label: 'Withdraw', value: '3'},
                    { label: 'Exchange accounts', value: '4' },
                    { label: 'API keys', value: '5' }
                ]}
            />
            <Box styles={{ paddingTop: '75px' }}>
                {settingsPages[parseInt(tab) - 1]}
            </Box>
        </>
    );
};

export default UserSettings;