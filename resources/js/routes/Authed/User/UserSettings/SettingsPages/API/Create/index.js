import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import APIKeyForm from '../APIKeyForm';
import { createAPIKey } from '../../../../../../../api/apiKeys';

const CreateAPIKey = ({ keys, setKeys }) => {
    const [ opened, setOpened ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const notifications = useNotifications();
    
    const submit = (data) => {
        setLoading(true);
        
        createAPIKey(data).then(({ data }) => {
            setLoading(false);
            setSuccess(true);
            setKeys([...keys, data]);
            
            notifications.showNotification({
                title: 'Success!',
                message: 'Successfully created API key',
            });
        }).catch((err) => {
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
            <APIKeyForm 
                opened={opened} 
                setOpened={setOpened} 
                loading={loading}
                submit={submit}
                success={success}
                setSuccess={setSuccess}
            />
        </>
    )
};

export default CreateAPIKey;