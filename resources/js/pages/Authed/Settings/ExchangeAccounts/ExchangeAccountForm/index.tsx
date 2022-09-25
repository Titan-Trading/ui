import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, Button, LoadingOverlay } from '@mantine/core';
import { isEmpty } from 'ramda';

import { useGetExchanges } from 'API/exchanges';
import { Select, Input } from 'Components/Forms';
import { AlertDanger } from 'Components/Alerts';

interface IExchangeAccountForm {
    formData?: IFormData;
    submit: any;
    loading: boolean;
    error: boolean;
}

interface IExchange {
    value: string;
    label: string;
}

export interface IFormData {
    exchange_id: number,
    api_key?: string;
    api_key_secret?: string;
    api_key_passphrase?: string;
    wallet_private_key?: string;
}

const ExchangeAccountForm = ({ formData = {}, submit, loading, error }: IExchangeAccountForm) => {
    const [ exchanges, setExchanges ] = useState<IExchange[]>([]);
    const { isLoading, error: exchangeError } = useGetExchanges(setExchanges);
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
    const watchConnOption = watch('connection_option'); 

    return (
        <Grid>
            <LoadingOverlay visible={isLoading || loading} />
            {exchangeError ? (
                <Grid.Col span={12}>
                    <AlertDanger message="Unable to retrieve exchanges" />
                </Grid.Col>
            ) : (
                <>
                    {error && (
                        <Grid.Col span={12}>
                            <AlertDanger style={{ marginBottom: '25px' }} message="Error creating exchange account" />
                        </Grid.Col>
                    )}
                    <Grid.Col span={6}>
                        <form onSubmit={handleSubmit(submit)}>
                            <Select
                                label="Exchange"
                                name="exchange_id"
                                required
                                rules={{ required: true }}
                                error={errors.exchange_id && 'Exchange is Required'}
                                options={exchanges}
                                control={control}
                            />
                            <Select
                                label="Connection Option"
                                name="connection_option"
                                control={control}
                                rules={{ required: true }}
                                required
                                error={errors.connection_option && 'Connection Option is Required'}
                                options={[
                                    { label: 'API Key/Secret', value: 'api' },
                                    { label: 'Wallet Private Key', value: 'wallet' }
                                ]}
                            />
                            {watchConnOption && (
                                        watchConnOption === 'wallet' ? (
                                    <Input
                                        label="Wallet Key"
                                        required
                                        error={errors.wallet_private_key && 'Wallet Key is Required'}
                                        {...register('wallet_private_key', { required: true })}
                                    />
                                ) : (
                                    <>
                                        <Input
                                            label="API Key"
                                            required
                                            error={errors.api_key && 'API Key is Required'}
                                            {...register('api_key', { required: true })}
                                        />
                                        <Input
                                            label="API Key Secret"
                                            required
                                            error={errors.api_key_secret && 'Secret is Required'}
                                            {...register('api_key_secret', { required: true })}
                                        />
                                        <Input
                                            label="API Key Passphrase"
                                            required
                                            error={errors.api_key_passphrase && 'Passphrase is Required'}
                                            {...register('api_key_passphrase', { required: true })}
                                        />
                                    </>
                                )
                            )}
                            <Button type="submit" color="cyan">
                                {isEmpty(formData) ? 'Add Exchange Account' : 'Update Exchange Account'}
                            </Button>
                        </form>
                    </Grid.Col>
                </>
            )}
        </Grid>
    )
};

export default ExchangeAccountForm;