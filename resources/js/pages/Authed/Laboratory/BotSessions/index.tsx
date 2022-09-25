import React, { useState, useEffect } from 'react';
import { Title, Space } from '@mantine/core';

import { AlertDanger } from 'Components/Alerts';
import BotSessionList from './BotSessionList'
import CreateBotSession from './Create';
import { getBotSessions } from 'API/botSessions';

export interface IBotSession {
    id?: number | undefined;
    connected_exchange_id: number;
    bot_id: number | string;
    name: string;
    parameters: any;
    mode: string;
    active: boolean;
};


const BotSessions = () => {
    const [ botSessions, setBotSessions ] = useState<IBotSession[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);

    useEffect(() => {
        setError(false);

        getBotSessions().then(({ data }) => {
            setBotSessions(data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>Bot Sessions</Title>
            <CreateBotSession botSessions={botSessions} setBotSessions={setBotSessions} />
            <Space h="xl" />

            {error ? (
                <AlertDanger message="Error: Unable to retrieve bot sessions" />
            ) : (
                <BotSessionList 
                    botSessions={botSessions} 
                    setBotSessions={setBotSessions} 
                    loading={loading} 
                />
            )}
        </>
    )
};

export default BotSessions;