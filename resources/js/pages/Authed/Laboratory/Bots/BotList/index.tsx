import React from 'react';
import { Button, LoadingOverlay, Text, Code, SimpleGrid, Group } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { filter } from 'ramda';

import List from 'Components/List';
import { deleteBot } from 'API/bots';
import { IBot } from '..';
import { IParameter } from '../Bot';

import './style.scss';

interface IBotList {
    bots: IBot[];
    setBots: any;
    loading: boolean;
}

const BotList = ({ bots, setBots, loading }: IBotList) => {
    const modals = useModals();
    const notifications = useNotifications();

    const deleteModalSettings = {
        title: 'Are you sure?',
        labels: { confirm: 'Delete Bot', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        closeOnConfirm: false,
    };

    const DeleteModalText = () => (
        <Text size="sm">
            Once this bot is deleted, it cannot be recovered and this 
            action cannot be undone.
        </Text>
    );

    const EmptyMessage = () => {
        return (
            <p>
                No <strong>bots</strong> exist
            </p>
        );
    };

    const openConfirmModal = (bot: IBot) => modals.openConfirmModal({
        ...deleteModalSettings,
        children: <DeleteModalText />,
        onConfirm: () => {
            deleteBot(bot.id).then(() => {
                setBots(filter(b => b.id !== bot.id, bots));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted bot',
                });
            }).catch(() => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete bot',
                    color: 'red'
                });
            });

            modals.openConfirmModal({
                ...deleteModalSettings,
                children: (
                    <>
                        <DeleteModalText />
                        <LoadingOverlay visible={true} />
                    </>
                ),
                closeOnCancel: false,
                closeOnClickOutside: false,
                closeOnEscape: false
            });
        }
    });

    const openContentModal = (bot: IBot) => modals.openModal({
        title: bot.name,
        children: (
            <>
                <h3>Algorithm Text</h3>
                <Code block style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
                    {bot.algorithm_text}
                </Code>
                <h3>Parameters</h3>
                <ul className="parameter-list">
                    {bot.parameter_options && 
                    JSON.parse(bot.parameter_options).map(({ name, value }: IParameter, i: number) => {
                        return (
                            <li key={i}>
                                <SimpleGrid cols={2}>
                                    <span>Name: <strong>{name}</strong></span>
                                    <span>Value: <strong>{value}</strong></span>
                                </SimpleGrid>
                            </li>
                        )
                    })}
                </ul>
                <Group position="right">
                    <Button 
                        variant="subtle" 
                        onClick={() => modals.closeAll()
                    }>
                        Edit
                    </Button>
                    <Button onClick={() => modals.closeAll()}>
                        Close
                    </Button>
                </Group>
                
            </>
        )
    })

    return (
        <List 
            loading={loading}
            items={bots}
            onView={openContentModal}
            onDelete={openConfirmModal}
            emptyMessage={<EmptyMessage />}
        />
    )
};

export default BotList;