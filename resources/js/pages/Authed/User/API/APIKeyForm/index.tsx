import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, LoadingOverlay, Group } from '@mantine/core';
import { isEmpty } from 'ramda';

import { Input } from 'Components/Forms';

interface IAPIKeyForm {
    opened: boolean;
    setOpened: any;
    formData?: IFormData;
    submit: any;
    loading: boolean;
    success: boolean;
    setSuccess: any;
}

export interface IFormData {
    name?: string;
}

const APIKeyForm = ({
    opened, 
    setOpened, 
    formData = {}, 
    submit, 
    loading, 
    success,
    setSuccess
}: IAPIKeyForm) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleClose = () => {
        setOpened(false);
        setSuccess(false);
        reset();
    }

    useEffect(() => {
        if (success) handleClose();
    }, [ success ]);

    return (
        <Modal
            opened={opened}
            onClose={() => handleClose()}
            title={isEmpty(formData) ? 'Create API Key' : `Edit ${formData.name}`}
        >
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    required
                    label="Name"
                    error={errors.name && 'Name is required'}
                    data-autofocus
                    {...register('name', {  required: true })}
                />
                <Group position="right">
                    <Button color="gray" onClick={() => handleClose()}>Cancel</Button>
                    <Button type="submit">Create API Key</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default APIKeyForm;