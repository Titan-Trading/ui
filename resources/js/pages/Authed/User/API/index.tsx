import React, { useState, useEffect } from 'react';
import { Title, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import APIKeyList from './ApiKeyList';
import { AlertDanger } from 'Components/Alerts';

import { useGetApiKeys } from 'API/apiKeys';
import paths from 'Paths';

export interface IKey {
    id: number;
    name: string;
    key: string;
}

const ApiKeys = () => {
    const { data, isLoading, error } = useGetApiKeys();
    const [ keys, setKeys ] = useState<IKey[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) setKeys(data?.data);
    }, [ data ]);
    
    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>API Keys</Title>
            <Button 
                color="green" 
                role="link" 
                onClick={() => navigate(paths.authed.settings.apiKey.createApiKey)}
            >
                Create Api Key
            </Button>
            {error ? (
                <AlertDanger
                    message="Error: Unable to retrieve API Keys"
                    styles={{ marginTop: '25px' }}
                />
            ) : (
                <APIKeyList 
                    keys={keys} 
                    setKeys={setKeys} 
                    loading={isLoading}
                />
            )}
        </>
    );
};

export default ApiKeys;