import React, { useEffect } from 'react';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

import List from 'Components/List';
import { IBot } from '..';
import { useDeleteBot } from 'API/bots';
import paths from 'Paths';

import './style.scss';

interface IBotList {
    bots: IBot[];
    loading: boolean;
}

const BotList = ({ bots, loading }: IBotList) => {
    const { mutate: deleteBot, isLoading, status } = useDeleteBot();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'success') {
            showNotification({
                title: 'Success!',
                message: 'Successfully deleted bot',
                color: 'cyan'
            });
        } else if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error deleting bot',
                color: 'red'
            });
        }
    }, [ status ]);
    

    return (
        <List 
            loading={loading || isLoading}
            items={bots}
            onDelete={(id: number) => deleteBot(id)}
            onEdit={(id: number) => navigate(paths.authed.laboratory.bots.editBuilder(id))}
            onView={(id: number) => navigate(paths.authed.laboratory.bots.viewBuilder(id))}
            emptyMessage={
                <Text>No bots found</Text>
            }
        />
    )
};

export default BotList;