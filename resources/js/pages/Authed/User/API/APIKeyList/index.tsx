import React from 'react';
import { Text } from '@mantine/core'; 
import { useNavigate } from 'react-router-dom';

import List from 'Components/List';
import { IKey } from '..';
import paths from 'Paths';

interface IAPIKeyList {
    keys: IKey[];
    setKeys: any;
    loading: boolean;
}

const ApiKeyList = ({ keys, loading }: IAPIKeyList) => {
    const navigate = useNavigate();

    return (
        <List 
            loading={loading}
            items={keys}
            onEdit={(id: number) => navigate(paths.authed.settings.apiKey.editApiKeyBuilder(id))}
            onView={(id: number) => navigate(paths.authed.settings.apiKey.viewApiKeyBuilder(id))}
            emptyMessage={
                <Text>No Api Keys found</Text>
            }
        />
    )
};

export default ApiKeyList;