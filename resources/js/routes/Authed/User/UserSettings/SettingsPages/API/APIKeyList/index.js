import React, { useState } from 'react';
import { Button, Card, Group, LoadingOverlay, Text, Code } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { isEmpty, filter } from 'ramda';

import { deleteAPIKey } from '../../../../../../../api/apiKeys';

import './styles.scss';

const APIKeyList = ({ keys, setKeys, loading }) => {
    if (isEmpty(keys) && !loading) return <></>;
    const modals = useModals();
    const notifications = useNotifications();

    const deleteModalSettings = {
        title: 'Are you sure?',
        labels: { confirm: 'Delete API Key', cancel: "Cancel" },
        confirmProps: { color: 'red' },
        closeOnConfirm: false,
    };
    const DeleteModalText = () => (
        <Text size="sm">
            Once this API key is deleted, it cannot be recovered and this 
            action cannot be undone.
        </Text>
    );

    const openConfirmModal = (id) => modals.openConfirmModal({
        ...deleteModalSettings,
        children: <DeleteModalText />,
        onConfirm: () => {
            deleteAPIKey(id).then(() => {
                setKeys(filter(k => k.id !== id, keys));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted API key',
                });
            }).catch((err) => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete API key',
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
            });
        }
    });

    const openContentModal = ({ name, key }) => modals.openModal({
        title: name,
        children: (
            <>
                <Code block style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
                    {key}
                </Code>
                <Button fullWidth onClick={() => modals.closeModal()}>
                    Close
                </Button>
            </>
        )
    })


    return (
        <Card>
            <LoadingOverlay visible={loading} />
            <ul className="key-list">
                {keys.map((k) => {
                    return (
                        <li key={k.id}>
                            <Text className="name">{k.name}</Text>
                            <Group>
                                <Button onClick={() => openContentModal(k)}>View</Button>
                                <Button onClick={() => openConfirmModal(k.id)} color="red">Delete</Button>
                            </Group>
                        </li>
                    );
                })}
            </ul>
        </Card>
    )
};

export default APIKeyList;