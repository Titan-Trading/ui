import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';

import BotSession, { IFormData } from '../BotSession';
import { IBotSession } from '../';
import { createBot } from 'API/bots';

interface ICreateBotSession {
    botSessions: IBotSession[];
    setBotSessions: any;
}

const CreateBotSession = ({ botSessions, setBotSessions }: ICreateBotSession) => {
    const [ opened, setOpened ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);
    const notifications = useNotifications();
    
    const submit = (data: IFormData) => {
        
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