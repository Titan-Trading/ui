import React, { useEffect } from 'react';
import { Text } from '@mantine/core'; 
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

import List from 'Components/List';
import { IKey } from '..';
import paths from 'Paths';
import { useDeleteApiKey } from 'API/apiKeys';

interface IAPIKeyList {
    keys: IKey[];
    loading: boolean;
}

const ApiKeyList = ({ keys, loading }: IAPIKeyList) => {
    const { mutate: deleteApiKey, isLoading, status } = useDeleteApiKey();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'success') {
            showNotification({
                title: 'Success!',
                message: 'Successfully deleted api key',
                color: 'cyan'
            });
        } else if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Error deleting api key',
                color: 'red'
            });
        }
    }, [ status ]);

    return (
        <List 
            loading={loading || isLoading}
            items={keys}
            onDelete={(id: number) => deleteApiKey(id)}
            onEdit={(id: number) => navigate(paths.authed.settings.apiKey.editBuilder(id))}
            onView={(id: number) => navigate(paths.authed.settings.apiKey.viewBuilder(id))}
            emptyMessage={
                <Text>No Api Keys found</Text>
            }
        />
    )
};

export default ApiKeyList;