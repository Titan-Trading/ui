import React from 'react';
import { Button, LoadingOverlay, Text, Code } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { filter } from 'ramda';

import { IConnectedExchange } from '../';
import List from 'Components/List';
import { deleteConnectedExchange } from 'API/connectedExchanges';

interface IConnectedExchangeList {
    connectedExchanges: IConnectedExchange[];
    setConnectedExchanges: any;
    loading: boolean;
}

const ConnectedExchangeList = ({
    connectedExchanges,
    setConnectedExchanges,
    loading
}: IConnectedExchangeList) => {
    const modals = useModals();
    const notifications = useNotifications();

    const deleteModalSettings = {
        title: 'Are you sure?',
        labels: { confirm: 'Delete Connected Exchange', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        closeOnConfirm: false,
    };

    const DeleteModalText = () => (
        <Text size="sm">
            Once this connected exchange is deleted, it cannot be recovered and this 
            action cannot be undone.
        </Text>
    );

    const EmptyMessage = () => {
        return (
            <p>
                No <strong>Connected Exchanges</strong> exist
            </p>
        );
    };

    const openConfirmModal = (exchange: IConnectedExchange) => modals.openConfirmModal({
        ...deleteModalSettings,
        children: <DeleteModalText />,
        onConfirm: () => {
            deleteConnectedExchange(exchange.id).then(() => {
                setConnectedExchanges(filter(e => e.id !== exchange.id, connectedExchanges));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted Connected Exchange',
                });
            }).catch(() => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete Connected Exchange',
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

    const openContentModal = (exchange: IConnectedExchange) => modals.openModal({
        title: exchange.name,
        children: (
            <>
                <Text style={{ marginBottom: '10px' }}>
                    {exchange.api_key ? 'API Key' : 'Wallet Private Key'}
                </Text>
                <Code block style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
                    {exchange.api_key ? exchange.api_key : exchange.wallet_private_key}
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
            items={connectedExchanges}
            onView={openContentModal}
            onDelete={openConfirmModal}
            emptyMessage={<EmptyMessage />}
        />
    );
};

export default ConnectedExchangeList;