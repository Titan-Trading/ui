import React, { useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

import BotForm, { IFormData } from '../BotForm';
import { useCreateBot } from 'API/bots';
import paths from 'Paths';

const CreateBot = () => {
    const { mutate: createBot, isLoading, status } = useCreateBot();
    const navigate = useNavigate();
    
    const submit = (data: IFormData) => {
        const { name, algorithm_text, parameters } = data;
        const payload = {
            name,
            algorithm_text,
            parameter_options: JSON.stringify(parameters?.map((p) => p.value))
        };

        createBot(payload);
    };

    useEffect(() => {
        if (status === 'success') {
            navigate(paths.authed.laboratory.base);
            showNotification({
                title: 'Success!',
                message: 'Successfully created bot',
            }); 
        } else if (status === 'error') {
            showNotification({
                title: 'Error!',
                message: 'Failed to create bot',
                color: 'red'
            });
        }
    }, [ status ]);

    return <BotForm submit={submit} loading={isLoading} />
};

export default CreateBot;