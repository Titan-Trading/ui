import React, { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import paths from 'Paths';
import { useGetBot, useUpdateBot } from 'API/bots';
import BotForm, { IFormData } from '../BotForm';

const EditBot = () => {
    const params = useParams();
    const { mutate: updateBot, isLoading, status } = useUpdateBot();
    const { data, isLoading: getLoading, error } = useGetBot(params.id);
    const navigate = useNavigate();
    
    const submit = (data: IFormData) => {
        const { name, algorithm_text, parameters } = data;
        const payload = {
            name,
            algorithm_text,
            parameter_options: JSON.stringify(parameters?.map((p) => p.value))
        };

        updateBot({ id: params.id, data: payload });
    };

    useEffect(() => {
        if (status === 'success') {
            navigate(paths.authed.laboratory.base);
            showNotification({
                title: 'Success!',
                message: 'Successfully update bot',
            }); 
        } else if (status === 'error' || error) {
            showNotification({
                title: 'Error!',
                message: 'Failed to update bot',
                color: 'red'
            });
        }
    }, [ status, error ]);

    return <BotForm submit={submit} loading={getLoading || isLoading} formData={data?.data} />
};

export default EditBot;