import React from 'react';
import { Button, LoadingOverlay, Text, Code } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { filter } from 'ramda';

import { IExchangeAccount } from '../index';
import List from 'Components/List';
import { deleteExchangeAccount } from 'API/exchangeAccounts';

interface IExchangeAccountList {
    exchangeAccounts: IExchangeAccount[];
    setExchangeAccounts: any;
    loading: boolean;
}

const ExchangeAccountList = ({
    exchangeAccounts,
    setExchangeAccounts,
    loading
}: IExchangeAccountList) => {
    const modals = useModals();
    const notifications = useNotifications();

    const deleteModalSettings = {
        title: 'Are you sure?',
        labels: { confirm: 'Delete exchange account', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        closeOnConfirm: false,
    };

    const DeleteModalText = () => (
        <Text size="sm">
            Once this exchange account is deleted, it cannot be recovered and this 
            action cannot be undone.
        </Text>
    );

    const EmptyMessage = () => {
        return (
            <p>
                No <strong>exchange accounts</strong> exist
            </p>
        );
    };

    const openConfirmModal = (exchange: IExchangeAccount) => modals.openConfirmModal({
        ...deleteModalSettings,
        children: <DeleteModalText />,
        onConfirm: () => {
            deleteExchangeAccount(exchange.id).then(() => {
                setExchangeAccounts(filter(e => e.id !== exchange.id, exchangeAccounts));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted exchange account',
                });
            }).catch(() => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete exchange account',
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

    const openContentModal = (exchange: IExchangeAccount) => modals.openModal({
        title: exchange.name,
        children: (
            <>
                <Text style={{ marginBottom: '10px' }}>
                    {exchange.api_key ? 'API Key' : 'Wallet Private Key'}
                </Text>
                <Code block style={{ whiteSpace: 'break-spaces', marginBottom: '20px' }}>
                    {exchange.api_key ? exchange.api_key : 'Hidden'}
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
            items={exchangeAccounts}
            onView={openContentModal}
            onDelete={openConfirmModal}
            emptyMessage={<EmptyMessage />}
        />
    );
};

export default ExchangeAccountList;