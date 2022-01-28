import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, InputWrapper, Input, LoadingOverlay, Group } from '@mantine/core';
import { isEmpty } from 'ramda';

const APIKeyForm = ({ 
    opened, 
    setOpened, 
    formData = {}, 
    submit, 
    loading, 
    success,
    setSuccess
}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
            title={isEmpty(formData) ? "Create API Key" : `Edit ${formData.name}`}
        >
            <LoadingOverlay visible={loading} />
            <form onSubmit={handleSubmit(submit)}>
                <InputWrapper
                    required
                    label="Name"
                    error={errors.name && "Name is required"}
                    sx={(theme) => ({
                        marginBottom: theme.spacing.lg
                    })}
                >
                    <Input data-autofocus id="name" type="name" {...register('name', {  required: true })} />
                </InputWrapper>
                <Group position="right">
                    <Button color="gray" onClick={() => handleClose()}>Cancel</Button>
                    <Button type="submit">Create API Key</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default APIKeyForm;