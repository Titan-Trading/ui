import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import APIKey, { IAPIData } from '../APIKey';
import { IKey } from '../';
import { createAPIKey } from 'API/apiKeys';

interface ICreateAPIKey {
    keys: IKey[];
    setKeys: any;
}

const CreateAPIKey = ({ keys, setKeys }: ICreateAPIKey) => {
    const [ opened, setOpened ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);
    const notifications = useNotifications();
    
    const submit = (data: IAPIData) => {
        setLoading(true);
        
        createAPIKey(data).then(({ data }) => {
            setLoading(false);
            setSuccess(true);
            setKeys([ ...keys, data ]);
            
            notifications.showNotification({
                title: 'Success!',
                message: 'Successfully created API key',
            });
        }).catch(() => {
            setLoading(false);
            
            notifications.showNotification({
                title: 'Error!',
                message: 'Failed to create API key',
                color: 'red'
            });
        });
    }

    return (
        <>
            <Button onClick={() => setOpened(true)}>Create API Key</Button>
            <APIKey 
                opened={opened} 
                setOpened={setOpened} 
                loading={loading}
                submit={submit}
                success={success}
                setSuccess={setSuccess}
            />
        </>
    );
};

export default CreateAPIKey;