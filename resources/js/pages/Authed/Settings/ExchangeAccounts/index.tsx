import React, { useState } from 'react';
import { Title, Alert, Button } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import CreateExchangeAccount from './Create';
import ExchangeAccountList from './ExchangeAccountList';
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
                style={{ marginBottom: '25px' }}
            >
                Add Exchange Account
            </Button>

            {error ? (
                <AlertDanger style={{ marginTop: '25px' }} message="Error: Unable to retrieve exchange accounts" />
            ) : (
                <ExchangeAccountList exchangeAccounts={accounts} loading={isLoading} />
            )}
        </>
    );
};

export default ExchangeAccounts;