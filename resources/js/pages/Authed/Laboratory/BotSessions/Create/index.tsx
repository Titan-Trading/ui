import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import BotSession, { IFormData } from '../BotSession';
import { IBotSession } from '../';
import { createBotSessions } from 'API/botSessions';

interface ICreateBotSession {
    botSessions: IBotSession[];
    setBotSessions: any;
}

const CreateBotSession = ({ botSessions, setBotSessions }: ICreateBotSession) => {
    const [ opened, setOpened ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);
    
    const submit = (data: IFormData) => {
        const payload = {
            ...data,
            parameters: JSON.stringify(data.parameters.map((p) => p.value))
        };
        setLoading(true);

        createBotSessions(payload).then(({ data }) => {
            setLoading(false);
            setSuccess(true);
            setBotSessions([ ...botSessions, data ]);
            
            showNotification({
                title: 'Success!',
                message: 'Successfully created bot session',
            });
        }).catch((err) => {
            setLoading(false);
            console.log(err)
            showNotification({
                title: 'Error!',
                message: 'Failed to create bot session',
                color: 'red'
            });
        })
    }

    return (
        <>
            <Button onClick={() => setOpened(true)}>Create Bot Session</Button>
            <BotSession
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

export default CreateBotSession;