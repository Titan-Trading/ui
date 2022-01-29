import React, { useState, useEffect } from 'react';
import { Title, Box, Divider, Alert } from '@mantine/core';
import { isEmpty } from 'ramda';
import { HiXCircle } from 'react-icons/hi';

import APIKeyList from './APIKeyList';
import CreateAPIKey from './Create';

import { getAllAPIKeys } from '../../../../../../api/apiKeys';

const API = () => {
    const [ keys, setKeys ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        getAllAPIKeys().then(({ data }) => {
            setKeys(data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            setError(true);
        });
    }, []);
    
    return (
        <>
            <Title order={2} style={{ marginBottom: '25px' }}>API Keys</Title>

            <Box>
                <CreateAPIKey keys={keys} setKeys={setKeys} />
                {error ? (
                    <Alert icon={<HiXCircle />} color="red">
                        Error: Unable to retrieve API keys
                    </Alert>
                ) : (
                    <APIKeyList keys={keys} setKeys={setKeys} loading={loading} />
                )}
            </Box>

            <Divider 
                style={{
                    marginTop: "100px",
                    marginBottom: "100px"
                }}
            />
        </>
    );
};

export default API;