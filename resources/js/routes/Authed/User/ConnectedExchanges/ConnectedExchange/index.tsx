import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@mantine/core';
import { isEmpty } from 'ramda';

import CEFormStepper from './CEFormStepper';

interface IConnectedExchange {
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
    connection_option?: any;
    api_key?: string;
    api_key_secret?: string;
    wallet_private_key?: string;
}

const ConnectedExchange = ({
    opened, 
    setOpened, 
    formData = {}, 
    submit, 
    loading,
    success,
    setSuccess
}: IConnectedExchange) => {
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
            title={isEmpty(formData) ? 'Connect an Exchange' : 'Edit Connected Exchange'}
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

export default ConnectedExchange;