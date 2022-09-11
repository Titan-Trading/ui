import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Group } from '@mantine/core';

import { Input } from 'Components/Forms';

interface IApiKeyForm {
    formData?: IFormData;
    submit: any;
    loading: boolean;
}

export interface IFormData {
    name?: string;
}

const ApiKeyForm = ({
    formData = {}, 
    submit, 
    loading
}: IApiKeyForm) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    return (
        <form onSubmit={handleSubmit(submit)}>
            <Input
                required
                label="Name"
                error={errors.name && 'Name is required'}
                data-autofocus
                {...register('name', {  required: true })}
            />
            <Button type="submit">Create API Key</Button>
        </form>
    );
};

export default ApiKeyForm;