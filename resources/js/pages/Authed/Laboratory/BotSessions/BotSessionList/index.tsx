import React from 'react';
import { Button, LoadingOverlay, Text, Code, SimpleGrid, Group } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { filter } from 'ramda';

import List from 'Components/List';
import { deleteBot } from 'API/bots';
import { IBotSession } from '..';

import './style.scss';

interface IBotSessionList {
    botSessions: IBotSession[];
    setBotSessions: any;
    loading: boolean;
}

const BotSessionList = ({ botSessions, setBotSessions, loading }: IBotSessionList) => {
    const modals = useModals();

    const deleteModalSettings = {
        title: 'Are you sure?',
        labels: { confirm: 'Delete Bot Session', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        closeOnConfirm: false,
    };

    const DeleteModalText = () => (
        <Text size="sm">
            Once this bot session is deleted, it cannot be recovered and this 
            action cannot be undone.
        </Text>
    );

    const EmptyMessage = () => {
        return (
            <p>
                No <strong>bots sessions</strong> exist
            </p>
        );
    };

    const openConfirmModal = (botSession: IBotSession) => modals.openConfirmModal({
        ...deleteModalSettings,
        children: <DeleteModalText />,
        onConfirm: () => {
            if (!botSession.id) return;
            
            deleteBot(botSession.id).then(() => {
                setBotSessions(filter(b => b.id !== botSession.id, botSessions));
                modals.closeAll();
                showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted bot session',
                });
            }).catch(() => {
                modals.closeAll();
                showNotification({
                    title: 'Error!',
                    message: 'Failed to delete bot session',
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

    const openContentModal = (botSession: IBotSession) => modals.openModal({
        title: botSession.name,
        children: (
            <>
            </>
        )
    })

    return (
        <List 
            loading={loading}
            items={botSessions}
            onView={openContentModal}
            onDelete={openConfirmModal}
            emptyMessage={<EmptyMessage />}
        />
    )
};

export default BotSessionList;