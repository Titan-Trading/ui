import React, { useEffect, useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import { Modal, Button, LoadingOverlay, Group, Switch, InputWrapper } from '@mantine/core';

import { Input, Select, IOption } from 'Components/Forms';
import { IBotSession } from '..';
import { getBots } from 'API/bots';
import { getConnectedExchanges } from 'API/connectedExchanges';


interface IBotSessionForm {
    opened: boolean;
    setOpened: any;
    submit: any;
    loading: boolean;
    success: boolean;
    setSuccess: any;
}

const BotSession = ({
    opened, 
    setOpened, 
    submit, 
    loading, 
    success,
    setSuccess
}: IBotSessionForm) => {
    const [ bots, setBots ] = useState<IOption[]>([]);
    const [ connectedExchanges, setConnectedExchanges ] = useState<IOption[]>([]);
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IBotSession>();
    const { field } = useController({ name: 'active', control });

    // connected_exchange_id: number;
    // bot_id: number;
    // name: string;
    // parameters: any;
    // mode: string;
    // active: boolean;

    const handleClose = () => {
        setOpened(false);
        setSuccess(false);
        reset();
    }

    useEffect(() => {
        if (success) handleClose();
    }, [ success ]);

    // TODO: create helper function from this
    const formatOptionArray = (data: any) => data.map((d: any) => {
        return {
            label: d.exchange ? d.exchange.name : d.name,
            value: d.id.toString()
        };
    });

    const getRelatedData = async () => {
        return await Promise.all([
            getBots(),
            getConnectedExchanges()
        ]).then((values) => {
            const botData = formatOptionArray(values[0].data);
            const exchangeData = formatOptionArray(values[1].data);

            // @ts-ignore - it's being annoying about a prop in another file 🙄
            setBots(botData); 
            setConnectedExchanges(exchangeData);
        }).catch((err) =>{
            console.log(err);
        });
    };

    useEffect(() => {
        getRelatedData();
    }, []);

    return (
        <Modal
            opened={opened}
            onClose={() => handleClose()}
            size="lg"
            title="Create Bot Session"
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
                <Select
                    required
                    label="Bot"
                    error={errors.bot_id && 'Bot is required'}
                    name="bot_id"
                    rules={{ required: true }}
                    control={control}
                    options={bots}
                />
                <Select
                    required
                    label="Connected Exchange"
                    error={errors.connected_exchange_id && 'Connected Exchange is required'}
                    name="connected_exchange_id"
                    rules={{ required: true }}
                    control={control}
                    options={connectedExchanges}
                />
                <InputWrapper label="Active">
                    {/* @ts-ignore */}
                    <Switch {...field} />
                </InputWrapper>
                <Group position="right">
                    <Button color="gray" onClick={() => handleClose()}>Cancel</Button>
                    <Button type="submit">Create Bot Session</Button>
                </Group>
            </form>
        </Modal>
    )
};

export default BotSession;