import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IFormData } from '../ExchangeAccount';
import { useCreateExchangeAccount } from 'API/exchangeAccounts';
import ExchangeAccountForm from '../ExchangeAccountForm';
import paths from 'Routes/index';

const CreateExchangeAccount = () => {
    const { mutate: createExchangeAccount, isLoading, status } = useCreateExchangeAccount();
    const navigate = useNavigate();

    const submit = (data: IFormData) => {
        const payload = {
            ...data,
            exchange_id: data.exchange_id.id
        };

        createExchangeAccount(payload);
    }

    useEffect(() => {
        if (status === 'success') navigate(paths.authed.settings.base);
    }, [ status ]);

    return <ExchangeAccountForm submit={submit} loading={isLoading} error={status === 'error'} />;
};

export default CreateExchangeAccount;