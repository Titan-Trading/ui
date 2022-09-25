import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, LoadingOverlay, Grid } from '@mantine/core';
import { isEmpty } from 'ramda';

import { Editor, Input, AddableList, IField } from 'Components/Forms';

interface IBotForm {
    formData?: IFormData;
    submit: any;
    loading: any;
}

export interface IFormData {
    name?: string;
    algorithm_text?: string;
    parameter_options?: string;
    parameters?: IField[];
}

const BotForm = ({
    formData = {},
    submit,
    loading
}: IBotForm) => {
    const [ initialLoad, setInitialLoad ] = useState<boolean>(true);
    const form = useForm<IFormData>();
    const { register, handleSubmit, formState: { errors }, control, setValue } = form;

    useEffect(() => {
        if (!isEmpty(formData)) {
            setValue('name', formData.name);
            setValue('algorithm_text', formData.algorithm_text);

            const parameters = JSON.parse(formData.parameter_options);
            setValue('parameters', parameters.map((p, i) => ({ id: i, value: p })));
        }
    }, [ formData ]);

    return (
        <Grid>
            <Grid.Col span={6}>
                <form onSubmit={handleSubmit(submit)}>
                    <LoadingOverlay visible={loading} />
                    <Input
                        required
                        label="Name"
                        data-autofocus
                        error={errors.name && 'Name is required'}
                        {...register('name', {  required: true })}
                    />
                    <Editor
                        required
                        label="Algorithm"
                        name="algorithm_text"
                        control={control}
                        error={errors.algorithm_text && 'Algorithm is required'}
                        rules={{ required: true }}
                    />
                    <AddableList
                        required
                        label="Parameter Name"
                        name="parameters"
                        form={form}
                        initialLoad={initialLoad}
                        setInitialLoad={setInitialLoad}
                    />
                    <Button type="submit" color="cyan">{isEmpty(formData) ? 'Add Bot' : 'Update Bot'}</Button>
                </form>
            </Grid.Col>
        </Grid>
    );
};

export default BotForm;