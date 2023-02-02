import React, { useState, useEffect } from 'react';
import { LoadingOverlay, Select, Group, Text, Box } from '@mantine/core'
import { Controller } from 'react-hook-form';

import { Input, Select as CustomSelect } from 'Components/Forms';
import { getExchanges } from 'API/exchanges';

interface IExchangeAccount {
    control: any;
    register: any;
    errors: any;
    watch: any;
    formData?: any;
}

interface IExchange {
    value: string;
    label: string;
}

const ConnectExchangeAccount = ({ register, errors, control, watch }: IExchangeAccount) => {
    const [ exchanges, setExchanges ] = useState<IExchange[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);
    const [ connectionOption, setConnectionOption ] = useState<string>('');
    // const watchConnOption = watch('connection_option');

    useEffect(() => {
        getExchanges().then(({ data }) => {
            const temp = data.map((e: any) => {
                return {
                    value: { name: e.name, id: e.id },
                    label: e.name
                };
            });

            setExchanges(temp);
            setLoading(false);
        }).catch(() => {
            setError(true);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <LoadingOverlay visible />
            ) : (
                <>
                    {error ? (
                        <Group position="center">
                            <Text color="red">Error: unable to retrieve exchanges</Text>
                        </Group>
                    ) : (
                        <Box
                            sx={(theme) => ({
                                paddingTop: theme.spacing.lg
                            })}
                        >
                            <Input
                                label="Name"
                                required
                                error={errors.name && 'Name is Required'}
                                {...register('name', { required: true })}
                            />
                            <Controller
                                control={control}
                                name="exchange_id"
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Select
                                        label="Exchange"
                                        searchable
                                        required
                                        nothingFound="No exchanges match your entry"
                                        error={errors.exchange_id && 'Exchange is required'}
                                        placeholder="Select exchange"
                                        data={exchanges}
                                        onChange={(value: any) => {
                                            onChange(value);

                                            const exchange: any = exchanges.filter((e: any) => value.id == e.id);

                                            setConnectionOption(exchange.is_dex ? 'wallet' : 'api-key');
                                        }}
                                        onBlur={onBlur}
                                        value={value}
                                        sx={(theme) => ({
                                            marginBottom: theme.spacing.lg
                                        })}
                                    />
                                )}
                            />
                            {/* <CustomSelect
                                label="Connection Option"
                                name="connection_option"
                                control={control}
                                rules={{ required: true }}
                                required
                                error={errors.connection_option}
                                options={[
                                    { label: 'API Key/Secret', value: 'api' },
                                    { label: 'Wallet Private Key', value: 'wallet' }
                                ]}
                            /> */}
                            {connectionOption && (
                                connectionOption === 'wallet' ? (
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
                                            label="API Secret"
                                            required
                                            error={errors.api_key_secret && 'API Secret is Required'}
                                            {...register('api_key_secret', { required: true })}
                                        />
                                        <Input
                                            label="API Key Passphrase"
                                            required
                                            error={errors.api_key_passphrase && 'API Key Passphrase is required'}
                                            {...register('api_key_passphrase', { required: true })}
                                        />
                                        <Input
                                            label="API Version"
                                            required
                                            error={errors.api_key_version && 'API Version is required'}
                                            {...register('api_key_version', { required: true, default: '2' })}
                                        />
                                    </>
                                )
                            )}
                        </Box>
                    )}
                </> 
            )}           
        </>
    );
};

export default ConnectExchangeAccount;