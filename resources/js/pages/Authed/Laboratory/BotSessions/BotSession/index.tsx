import React, { useEffect, useState } from 'react';
import { useForm, useController, useFieldArray } from 'react-hook-form';
import { Modal, Button, LoadingOverlay, Group, Switch, Input as MantineInput, SimpleGrid } from '@mantine/core';

import { Input, Select, IOption } from 'Components/Forms';
import { IBotSession } from '..';
import { getBots, getBot } from 'API/bots';
import { getExchangeAccounts } from 'API/exchangeAccounts';

interface IBotSessionForm {
    opened: boolean;
    setOpened: any;
    submit: any;
    loading: boolean;
    success: boolean;
    setSuccess: any;
}

export interface IFormData {
    name?: string;
    bot_id?: number;
    connected_exchange_id?: number;
    parameters?: string[] | string;
    mode?: string;
    active?: boolean;
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
    const { register, handleSubmit, formState: { errors }, reset, control, watch, setFocus } = useForm<IBotSession>();
    const { field } = useController({ name: 'active', control });
    const watchBot = watch('bot_id');
    const { fields, append, replace, remove } = useFieldArray({ control, name: 'parameters' });
    const modes: IOption[] = [ // TODO: replace with future query
        { label: 'Backtesting', value: 'backtesting' },
        { label: 'Paper Trading', value: 'paper' },
        { label: 'Live Trading', value: 'live' }
    ];

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
            getExchangeAccounts()
        ]).then((values) => {
            const botData = formatOptionArray(values[0].data);
            const exchangeData = formatOptionArray(values[1].data);

            // @ts-ignore - it's being annoying about a prop in another file 🙄
            setBots(botData); 
            setConnectedExchanges(exchangeData);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getRelatedData();
    }, []);

    useEffect(() => {
        if (watchBot) {
            let id = 0;

            // get rid of ts error
            if (typeof watchBot === 'string') id = parseInt(watchBot); 

            // replace all fields with an empty one and delete it (only way to clear them out)
            replace({});
            remove(0);

            getBot(id).then(({ data }) => {
                const params = JSON.parse(data.parameter_options);
                params.forEach((p: string) => append({ value: '', param: p }));
                setFocus('parameters.0.value');
            }).catch((e) => console.log(e))
        }
    }, [ watchBot ]);

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
                {fields.length > 0 && (
                    <SimpleGrid cols={2}>
                        {fields.map((field, i) => {
                            return (
                                <Input
                                    required
                                    key={i}
                                    label={field.param}
                                    error={errors.parameters && errors.parameters[i] && `${field.param} value is required`}
                                    {...register(`parameters.${i}.value`, { required: true })}
                                />
                            )
                        })}
                    </SimpleGrid>
                )}
                <Select
                    required
                    label="Connected Exchange"
                    error={errors.connected_exchange_id && 'Connected Exchange is required'}
                    name="connected_exchange_id"
                    rules={{ required: true }}
                    control={control}
                    options={connectedExchanges}
                />
                <Select
                    required
                    label="Mode"
                    error={errors.mode && 'Mode is required'}
                    name="mode"
                    rules={{ required: true }}
                    control={control}
                    options={modes}
                />
                <MantineInput.Wrapper label="Active">
                    {/* @ts-ignore */}
                    <Switch {...field} />
                </MantineInput.Wrapper>
                <Group position="right">
                    <Button color="gray" onClick={() => handleClose()}>Cancel</Button>
                    <Button type="submit">Create Bot Session</Button>
                </Group>
            </form>
        </Modal>
    )
};

export default BotSession;