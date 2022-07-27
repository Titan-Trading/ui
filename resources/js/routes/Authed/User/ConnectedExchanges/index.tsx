import React, { useState, useEffect } from 'react';
import { Title, Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';

import CreateExchangeConnection from './Create';
import ConnectedExchangeList from './ConnectedExchangeList';
import { getConnectedExchanges } from 'API/connectedExchanges';

export interface IConnectedExchange {
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


const ConnectedExchanges = () => {
    const [ connectedExchanges, setConnectedExchanges ] = useState<IConnectedExchange[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        setError(false);

        getConnectedExchanges().then(({ data }) => {
            data = data.map((d: IConnectedExchange) => {
                return {
                    api_key: d.api_key,
                    name: d.exchange.name,
                    id: d.id,
                    user_id: d.user_id,
                    wallet_private_key: d.wallet_private_key
                };
            });

            setConnectedExchanges(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>Connected Exchanges</Title>
            <CreateExchangeConnection 
                connectedExchanges={connectedExchanges} 
                setConnectedExchanges={setConnectedExchanges} 
            />

            {error ? (
                <Alert style={{ marginTop: '25px' }} icon={<HiXCircle />} color="red">
                    Error: Unable to retrieve connected exchanges
                </Alert>
            ) : (
                <ConnectedExchangeList 
                    connectedExchanges={connectedExchanges} 
                    setConnectedExchanges={setConnectedExchanges} 
                    loading={loading}
                />
            )}
        </>
    );
};

export default ConnectedExchanges;