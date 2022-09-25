import React from 'react';
import { Space, Title, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import BotList from './List';
import { AlertDanger } from 'Components/Alerts';
import { IFormData } from './BotForm'
import { useGetBots } from 'API/bots';
import paths from 'Paths';

export interface IBot extends IFormData {
    id: number;
}

const Bots = () => {
    const { data, isLoading, error } = useGetBots();
    const navigate = useNavigate();
    
    return (
        <>
            <Title order={2} style={{ margin: '25px 0' }}>Bots</Title>
            <Button 
                color="cyan" 
                role="link" 
                onClick={() => navigate(paths.authed.laboratory.bots.create)}
            >
                Add Bot
            </Button>
            <Space h="xl" />
            {error ? (
                <AlertDanger message="Error: Unable to retrieve bots" />
            ) : (
                <BotList bots={data?.data} loading={isLoading} />
            )}
        </>
    );
};

export default Bots;