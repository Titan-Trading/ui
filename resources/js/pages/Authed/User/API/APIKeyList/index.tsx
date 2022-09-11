import React from 'react';
import { useNavigate } from 'react-router-dom';

import List from 'Components/List';
import { IKey } from '..';
import paths from 'Paths';

interface IAPIKeyList {
    keys: IKey[];
    setKeys: any;
    loading: boolean;
}

const APIKeyList = ({ keys, loading }: IAPIKeyList) => {
    const navigate = useNavigate();

    return (
        <List 
            loading={loading}
            items={keys}
            onView={(id: number) => navigate(PATHS.authed.settings.apiKey.editApiKeyBuilder(id))}
            emptyMessage="Nothing here"
        />
    )
};

export default APIKeyList;