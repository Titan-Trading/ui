import React, { useEffect } from 'react';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { IExchangeAccount } from '../index';
import List from 'Components/List';
import paths from 'Routes/index';
import { useDeleteExchangeAccount } from 'API/exchangeAccounts';
import { showNotification } from '@mantine/notifications';

interface IExchangeAccountList {
    exchangeAccounts: IExchangeAccount[];
    loading: boolean;
}

const ExchangeAccountList = ({
    exchangeAccounts,
    loading
}: IExchangeAccountList) => {
    const { mutate: deleteExchangeAccount, isLoading, status } = useDeleteExchangeAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'success') {
            showNotification({
                title: 'Success!',
                message: 'Successfully deleted exchange account',
                color: 'cyan'
            });
        } else if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error deleting exchange account',
                color: 'red'
            });
        }
    }, [ status ]);
    
    return (
        <List 
            loading={loading || isLoading}
            items={exchangeAccounts}
            onDelete={(id: number) => deleteExchangeAccount(id)}
            onView={(id: number) => navigate(paths.authed.settings.exchangeAccounts.viewBuilder(id))}
            emptyMessage={
                <Text>No exchange accounts found</Text>
            }
        />
    );
};

export default ExchangeAccountList;