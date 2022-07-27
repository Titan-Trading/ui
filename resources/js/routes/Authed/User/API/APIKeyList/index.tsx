import React from 'react';
import { Button, LoadingOverlay, Text, Code } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { filter } from 'ramda';

import List from 'Components/List';
import { deleteAPIKey } from 'API/apiKeys';
import { IKey } from '..';

interface IAPIKeyList {
    keys: IKey[];
    setKeys: any;
    loading: boolean;
}

const APIKeyList = ({ keys, setKeys, loading }: IAPIKeyList) => {
    const modals = useModals();
    const notifications = useNotifications();

    const deleteModalSettings = {
        title: 'Are you sure?',
        labels: { confirm: 'Delete API Key', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        closeOnConfirm: false,
    };

    const DeleteModalText = () => (
        <Text size="sm">
            Once this API key is deleted, it cannot be recovered and this 
            action cannot be undone.
        </Text>
    );

    const EmptyMessage = () => {
        return (
            <p>
                No <strong>API Keys</strong> exist
            </p>
        );
    };

    const openConfirmModal = (key: IKey) => modals.openConfirmModal({
        ...deleteModalSettings,
        children: <DeleteModalText />,
        onConfirm: () => {
            deleteAPIKey(key.id).then(() => {
                setKeys(filter(k => k.id !== key.id, keys));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted API key',
                });
            }).catch(() => {
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
                closeOnClickOutside: false,
                closeOnEscape: false
            });
        }
    });

    const openContentModal = (key: IKey) => modals.openModal({
        title: key.name,
        children: (
            <>
                <Code block style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
                    {key.key}
                </Code>
                <Button fullWidth onClick={() => modals.closeAll()}>
                    Close
                </Button>
            </>
        )
    })

    return (
        <List 
            loading={loading}
            items={keys}
            onView={openContentModal}
            onDelete={openConfirmModal}
            emptyMessage={<EmptyMessage />}
        />
    )
};

export default APIKeyList;