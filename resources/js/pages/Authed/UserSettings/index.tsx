import React, { useEffect, useState } from 'react';
import { SegmentedControl, Box } from '@mantine/core';
import { useDispatch } from 'react-redux';

import API from './API';
import ExchangeAccounts from './ExchangeAccounts';
import { setTitle } from 'Redux/layout';
import Billing from './Billing';
import General from './General';

const UserSettings = () => {
    const dispatch = useDispatch();
    const [ tab, setTab ] = useState<string>('1');
    const settingsPages = [
        <General key={0} />,
        <Billing key={1} />,
        <ExchangeAccounts key={2} />,
        <API key={3} />
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
                // color="blue"
                data={[
                    { label: 'General', value: '1' },
                    { label: 'Billing', value: '2' },
                    { label: 'Exchange Accounts', value: '3' },
                    { label: 'API Keys', value: '4' }
                ]}
            />
            <Box styles={{ paddingTop: '75px' }}>
                {settingsPages[parseInt(tab) - 1]}
            </Box>
        </>
    );
};

export default UserSettings;