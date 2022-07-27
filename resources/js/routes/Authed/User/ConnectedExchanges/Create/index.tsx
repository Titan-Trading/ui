import React, { useState } from 'react';
import { Button } from '@mantine/core';

import { IConnectedExchange } from '../';
import ConnectedExchange, { IFormData } from '../ConnectedExchange';
import { createConnectedExchange } from 'API/connectedExchanges';

interface ICreateExchangeConnection {
    connectedExchanges: IConnectedExchange[];
    setConnectedExchanges: any;
}

const CreateExchangeConnection = ({
    connectedExchanges,
    setConnectedExchanges
}: ICreateExchangeConnection) => {
    const [ opened, setOpened ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);

    const submit = (data: IFormData) => {
        setLoading(true);

        const payload = {
            ...data,
            exchange_id: data.exchange_id.id
        };

        const response = new Promise((resolve, reject) => {
            const name = data.exchange_id.name;

            createConnectedExchange(payload).then(({ data }) => {
                const newConnectedExchange = {
                    ...data,
                    name: name
                };

                setLoading(false);
                resolve(payload);
                setConnectedExchanges([ ...connectedExchanges, newConnectedExchange ]);
            }).catch(() => {
                //error is taken care of via the stepper
                setLoading(false);
                reject(payload);
            })
        });

        return response;
    }

    return (
        <>
            <Button onClick={() => setOpened(true)}>Connect an Exchange</Button>
            <ConnectedExchange 
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

export default CreateExchangeConnection;