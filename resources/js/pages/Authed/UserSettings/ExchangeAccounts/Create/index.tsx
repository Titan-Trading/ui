import React, { useState } from 'react';
import { Button } from '@mantine/core';

import { IExchangeAccount } from '..';
import ExchangeAccount, { IFormData } from '../ExchangeAccount';
import { createExchangeAccount } from 'API/exchangeAccounts';

interface ICreateExchangeAccount {
    exchangeAccounts: IExchangeAccount[];
    setExchangeAccounts: any;
}

const CreateExchangeConnection = ({
    exchangeAccounts,
    setExchangeAccounts
}: ICreateExchangeAccount) => {
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

            createExchangeAccount(payload).then(({ data }) => {
                const newExchangeAccount = {
                    ...data,
                    name: name
                };

                setLoading(false);
                resolve(payload);
                setExchangeAccounts([ ...exchangeAccounts, newExchangeAccount ]);
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
            <Button onClick={() => setOpened(true)}>Connect an Exchange Account</Button>
            <ExchangeAccount 
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