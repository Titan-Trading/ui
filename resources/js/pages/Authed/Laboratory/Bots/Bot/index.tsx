import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Modal, Button, LoadingOverlay, Group, Grid, SimpleGrid, Tooltip } from '@mantine/core';
import { isEmpty } from 'ramda';
import { BsPlus, BsXCircleFill } from 'react-icons/bs';

import { Input } from 'Components/Forms';

import './style.scss';

interface IBot {
    opened: boolean;
    setOpened: any;
    formData?: IFormData;
    submit: any;
    loading: boolean;
    success: boolean;
    setSuccess: any;
};

export interface IFormData {
    name?: string;
    algorithm_text?: string;
    parameters?: IParameter[];
    parameter_options?: string;
}

export interface IParameter {
    name: string;
    value: string;
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
    const { register, handleSubmit, formState: { errors }, reset, control, clearErrors } = useForm<IFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "parameters",
    });

    const handleClose = () => {
        setOpened(false);
        setSuccess(false);
        setInitialLoad(true);
        reset();
    }

    useEffect(() => {
        if (success) handleClose();
    }, [ success ]);

    useEffect(() => {
        if (fields.length === 0) {
            if (!initialLoad) {
                clearErrors('parameters');
            } else {
                append({ name: '', value: '' });
                setInitialLoad(false);
            }
        }
    }, [ fields ]);

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
                <p>Parameters</p>
                <ul className="parameters-list">
                    {fields.length > 0 && fields.map((field, i) => (
                        <li>
                            <Grid>
                                <Grid.Col span={11}>
                                    <SimpleGrid cols={2} spacing="sm">
                                        <Input
                                            required
                                            label="Parameter Name"
                                            key={`${field.id}-name`}
                                            error={errors.parameters && errors.parameters[i].name && 'Parameter Name is required'}
                                            {...register(`parameters.${i}.name`, { required: true })} 
                                        />
                                        <Input
                                            required
                                            label="Parameter Value"
                                            key={`${field.id}-value`}
                                            error={errors.parameters && errors.parameters[i].value && 'Parameter Value is required'}
                                            {...register(`parameters.${i}.value`, { required: true })} 
                                        />
                                    </SimpleGrid>
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <span className="remove-button" role="button" onClick={() => remove(i)}>
                                        <Tooltip label="Remove">
                                            <BsXCircleFill />
                                        </Tooltip>
                                    </span>
                                </Grid.Col>
                            </Grid>
                        </li>
                    ))}
                </ul>
                <div className="add-button-container">
                    <Button variant="subtle" className="add-parameter" onClick={() => append({ name: '', value: '' })}>
                        <BsPlus />&nbsp;Add Parameter
                    </Button>
                </div>
                <Group position="right">
                    <Button color="gray" onClick={() => handleClose()}>Cancel</Button>
                    <Button type="submit">Create Bot</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default Bot;