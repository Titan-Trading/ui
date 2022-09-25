import React from 'react';
import { Title, Button, Space } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import APIKeyList from './List';
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
    const navigate = useNavigate();
    
    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>API Keys</Title>
            <Button 
                color="cyan" 
                role="link" 
                onClick={() => navigate(paths.authed.settings.apiKey.create)}
            >
                Add Api Key
            </Button>
            <Space h="xl" />
            {error ? (
                <AlertDanger message="Error: Unable to retrieve API Keys" />
            ) : (
                <APIKeyList 
                    keys={data?.data} 
                    loading={isLoading}
                />
            )}
        </>
    );
};

export default ApiKeys;