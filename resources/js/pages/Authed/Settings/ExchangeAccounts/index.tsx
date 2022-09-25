import React, { useState } from 'react';
import { Title, Button, Space } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import ExchangeAccountList from './List';
import { useGetExchangeAccounts } from 'API/exchangeAccounts';
import paths from 'Routes/index';
import { AlertDanger } from 'Components/Alerts';

export interface IExchangeAccount {
    name?: string,
    id: number,
    user_id: number;
    wallet_private_key: string | null;
    api_key: string | null;
    exchange: IExchangeObj;
}

interface IExchangeObj {
    id: number;
    name: string;
}


const ExchangeAccounts = () => {
    const [ accounts, setAccounts ] = useState<IExchangeAccount[]>([]);
    const { isLoading, error } = useGetExchangeAccounts(setAccounts);
    const navigate = useNavigate();

    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>Exchange Accounts</Title>
            <Button 
                color="cyan" 
                role="link" 
                onClick={() => navigate(paths.authed.settings.exchangeAccounts.create)}
            >
                Add Exchange Account
            </Button>
            <Space h="xl" />

            {error ? (
                <AlertDanger message="Error: Unable to retrieve exchange accounts" />
            ) : (
                <ExchangeAccountList exchangeAccounts={accounts} loading={isLoading} />
            )}
        </>
    );
};

export default ExchangeAccounts;