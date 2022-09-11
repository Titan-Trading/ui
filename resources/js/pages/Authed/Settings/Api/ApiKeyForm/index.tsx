import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Group, Grid } from '@mantine/core';
import { LoadingOverlay } from '@mantine/core';

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
    loading,
}: IApiKeyForm) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Grid>
            <Grid.Col span={6}>
                <form onSubmit={handleSubmit(submit)}>
                    <LoadingOverlay visible={loading} />
                    <Input
                        required
                        label="Name"
                        error={errors.name && 'Name is required'}
                        data-autofocus
                        {...register('name', {  required: true })}
                    />
                    <Button type="submit" color="cyan">Add API Key</Button>
                </form>
            </Grid.Col>
        </Grid>
    );
};

export default ApiKeyForm;