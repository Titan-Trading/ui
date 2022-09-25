import React, { useEffect } from 'react';
import { Text } from '@mantine/core'; 
import { showNotification } from '@mantine/notifications';

import List from 'Components/List';
import { IKey } from '..';
import { useDeleteApiKey } from 'API/apiKeys';

interface IAPIKeyList {
    keys: IKey[];
    loading: boolean;
}

const ApiKeyList = ({ keys, loading }: IAPIKeyList) => {
    const { mutate: deleteApiKey, isLoading, status } = useDeleteApiKey();

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
            emptyMessage={
                <Text>No Api Keys found</Text>
            }
        />
    )
};

export default ApiKeyList;