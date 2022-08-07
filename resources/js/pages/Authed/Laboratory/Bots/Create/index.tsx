import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import Bot, { IFormData } from '../Bot';
import { IBot } from '../';
import { createBot } from 'API/bots';

interface ICreateBot {
    bots: IBot[];
    setBots: any;
}

const CreateBot = ({ bots, setBots }: ICreateBot) => {
    const [ opened, setOpened ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);
    const notifications = useNotifications();
    
    const submit = (data: IFormData) => {
        const { name, algorithm_text, parameters } = data;
        const payload = {
            name,
            algorithm_text,
            parameter_options: JSON.stringify(parameters)
        };
        setLoading(true);
            
        createBot(payload).then(({ data }) => {
            setLoading(false);
            setSuccess(true);
            setBots([ ...bots, data ]);
            
            notifications.showNotification({
                title: 'Success!',
                message: 'Successfully created bot',
            });
        }).catch((err) => {
            setLoading(false);
            console.log(err)
            notifications.showNotification({
                title: 'Error!',
                message: 'Failed to create bot',
                color: 'red'
            });
        });
    }

    return (
        <>
            <Button onClick={() => setOpened(true)}>Create Bot</Button>
            <Bot 
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

export default CreateBot;