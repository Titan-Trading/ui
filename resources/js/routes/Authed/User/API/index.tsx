import React, { useState, useEffect } from 'react';
import { Title, Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';

import APIKeyList from './APIKeyList';
import CreateAPIKey from './Create';

import { getAPIKeys } from 'API/apiKeys';

export interface IKey {
    id: number;
    name: string;
    key: string;
}

const API = () => {
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
                <Alert style={{ marginTop: '25px' }} icon={<HiXCircle />} color="red">
                    Error: Unable to retrieve API Keys
                </Alert>
            ) : (
                <APIKeyList keys={keys} setKeys={setKeys} loading={loading} />
            )}
        </>
    );
};

export default API;