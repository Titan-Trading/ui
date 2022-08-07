import React, { useState, useEffect } from 'react';
import { Title } from '@mantine/core';

import APIKeyList from './APIKeyList';
import CreateAPIKey from './Create';
import { AlertDanger } from 'Components/Alerts';

import { getAPIKeys } from 'API/apiKeys';

export interface IKey {
    id: number;
    name: string;
    key: string;
}

const APIKeys = () => {
    const [ keys, setKeys ] = useState<IKey[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        setError(false);

        getAPIKeys().then(({ data }) => {
            setKeys(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setError(true);
        });
    }, []);
    
    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>API Keys</Title>
            <CreateAPIKey keys={keys} setKeys={setKeys} />

            {error ? (
                <AlertDanger
                    message="Error: Unable to retrieve API Keys"
                    styles={{ marginTop: '25px' }}
                />
            ) : (
                <APIKeyList keys={keys} setKeys={setKeys} loading={loading} />
            )}
        </>
    );
};

export default APIKeys;