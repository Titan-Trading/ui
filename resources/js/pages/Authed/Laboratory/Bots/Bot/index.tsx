import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, LoadingOverlay, Group } from '@mantine/core';
import { isEmpty } from 'ramda';

import { Input, AddableList, IField } from 'Components/Forms';

interface IBot {
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
    algorithm_text?: string;
    parameter_options?: string;
    parameters?: IField[];
}

const Bot = ({
    opened, 
    setOpened, 
    formData = {}, 
    submit, 
    loading, 
    success,
    setSuccess
}: IBot) => {
    const [ initialLoad, setInitialLoad ] = useState<boolean>(true);
    const form = useForm<IFormData>();
    const { register, handleSubmit, formState: { errors }, reset } = form;

    const handleClose = () => {
        setOpened(false);
        setSuccess(false);
        setInitialLoad(true);
        reset();
    }

    useEffect(() => {
        if (success) handleClose();
    }, [ success ]);

    return (
        <Modal
            opened={opened}
            onClose={() => handleClose()}
            size="lg"
            title={isEmpty(formData) ? 'Create Bot' : `Edit ${formData.name}`}
        >
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit(submit)}>
                <Input
                    required
                    label="Name"
                    data-autofocus
                    error={errors.name && 'Name is required'}
                    {...register('name', {  required: true })}
                />
                <Input
                    required
                    label="Algorithm"
                    type="textarea"
                    error={errors.algorithm_text && 'Algorithm is required'}
                    {...register('algorithm_text', {  required: true })}
                />
                <AddableList
                    required
                    label="Parameter Name"
                    name="parameters"
                    form={form}
                    initialLoad={initialLoad}
                    setInitialLoad={setInitialLoad}
                />
                <Group position="right">
                    <Button color="gray" onClick={() => handleClose()}>Cancel</Button>
                    <Button type="submit">Create Bot</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default Bot;