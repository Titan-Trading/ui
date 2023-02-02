import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@mantine/core';
import { isEmpty } from 'ramda';

import CEFormStepper from './CEFormStepper';

interface IExchangeAccount {
    opened: boolean;
    setOpened: any;
    formData?: IFormData | {};
    submit: any;
    loading: boolean;
    success: boolean;
    setSuccess: any;
}

export interface IFormData {
    exchange_id: any;
    name: string;
    // connection_option?: any;
    api_version: string;
    api_key?: string;
    api_key_secret?: string;
    api_key_passphrase?: string;
    wallet_private_key?: string;
}

const ExchangeAccount = ({
    opened, 
    setOpened, 
    formData = {}, 
    submit, 
    loading,
    success,
    setSuccess
}: IExchangeAccount) => {
    const { reset } = useForm<IFormData>();

    const handleClose = () => {
        setOpened(false);
        setSuccess(false);
        reset();
    }

    useEffect(() => {
        if (success) handleClose();
    }, [ success ])

    return (
        <Modal
            opened={opened}
            onClose={() => handleClose()}
            title={isEmpty(formData) ? 'Connect an exchange account' : 'Edit exchange account'}
            size="lg"
            closeOnEscape={false}
            closeOnClickOutside={false}
         >
            <CEFormStepper 
                formData={formData} 
                loading={loading}
                submit={submit}
                handleClose={handleClose}
            />
        </Modal>
    );
};

export default ExchangeAccount;