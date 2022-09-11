import React, { useEffect } from 'react';
import { useNotifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import paths from 'Paths';
import { useUpdateApiKey } from 'API/apiKeys';
import ApiKeyForm, { IFormData } from '../ApiKeyForm';

const EditApiKey = () => {
    const params = useParams();
    const { mutate: updateApiKey, isLoading } = useUpdateApiKey();
    const navigate = useNavigate();

    // updateApiKey();

    useEffect(() => {
        if (params.id) {
            updateApiKey({
                id: 1,
                data: {
                    name: 'Whatever'
                }
            })
        }
    }, [ params.id ])
    
    const submit = (data: IFormData) => console.log(data);

    return <ApiKeyForm submit={submit} loading={isLoading} />
};

export default EditApiKey;