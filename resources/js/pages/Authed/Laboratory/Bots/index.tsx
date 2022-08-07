import React, { useState, useEffect } from 'react';
import { Title } from '@mantine/core';

import BotList from './BotList';
import CreateBot from './Create';
import { AlertDanger } from 'Components/Alerts';
import { IFormData } from './Bot'

import { getBots } from 'API/bots';

export interface IBot extends IFormData {
    id: number;
}

const Bots = () => {
    const [ bots, setBots ] = useState<IBot[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        setError(false);

        getBots().then(({ data }) => {
            setBots(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setError(true);
        });
    }, []);
    
    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>Bots</Title>
            <CreateBot bots={bots} setBots={setBots} />

            {error ? (
                <AlertDanger
                    message="Error: Unable to retrieve bots"
                    styles={{ marginTop: '25px' }}
                />
            ) : (
                <BotList bots={bots} setBots={setBots} loading={loading} />
            )}
        </>
    );
};

export default Bots;