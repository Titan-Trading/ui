import React, { useState, useEffect } from 'react';
import { Grid, Title } from '@mantine/core';

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
            {/* Title with space for button */}
            <Grid columns={12} style={{margin: '8px 0'}}>
                <Grid.Col span={6}>
                    <span style={{ margin: '25px 0', fontSize: '24px' }}>API keys</span>
                </Grid.Col>
                <Grid.Col span={6} style={{textAlign: 'right'}}>
                    <CreateAPIKey keys={keys} setKeys={setKeys} />
                </Grid.Col>
            </Grid>

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