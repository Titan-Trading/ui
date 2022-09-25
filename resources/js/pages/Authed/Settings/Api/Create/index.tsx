import React, { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

import ApiKeyForm, { IFormData } from '../ApiKeyForm';
import { useCreateApiKey } from 'API/apiKeys';
import paths from 'Paths';

const CreateAPIKey = () => {
    const { mutate: createApiKey, isLoading, status } = useCreateApiKey();
    const navigate = useNavigate();
    
    const submit = (data: IFormData) => createApiKey(data);

    useEffect(() => {
        if (status === 'success') {
            navigate(paths.authed.settings.base);
            showNotification({
                title: 'Success!',
                message: 'Successfully created API key',
            }); 
        } else if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Failed to create API key',
                color: 'red'
            });
        }
    }, [ status ]);

    return <ApiKeyForm loading={isLoading} submit={submit} />
};

export default CreateAPIKey;