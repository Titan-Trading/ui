import React, { useState, useEffect } from 'react';
import { LoadingOverlay, Select, Group, Text, RadioGroup, Radio, Box } from '@mantine/core'
import { Controller } from 'react-hook-form';

import Input from 'Components/Input';
import { getExchanges } from 'API/exchanges';

interface IConnectExchange {
    control: any;
    register: any;
    errors: any;
    formData?: any;
}

interface IExchange {
    value: string;
    label: string;
}

const ConnectExchange = ({ register, errors, control }: IConnectExchange) => {
    const [ exchanges, setExchanges ] = useState<IExchange[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean>(false);
    const [ showWalletKey, setShowWalletKey ] = useState<boolean>(false);

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
                            <Text color="red">Error: Unable to retrieve exchanges</Text>
                        </Group>
                    ) : (
                        <Box
                            sx={(theme) => ({
                                paddingTop: theme.spacing.lg
                            })}
                        >
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
                                        error={errors.exchange_id && 'Exchange is Required'}
                                        placeholder="Select Exchange"
                                        data={exchanges}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        sx={(theme) => ({
                                            marginBottom: theme.spacing.lg
                                        })}
                                    />
                                )}
                            />
                            <Controller
                                name="connection_option"
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <RadioGroup
                                        label="Connection Option"
                                        size="sm"
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        defaultValue="api"
                                        sx={(theme) => ({
                                            marginBottom: theme.spacing.lg
                                        })}
                                    >
                                        <Radio value="api" onClick={() => setShowWalletKey(false)}>API Key/Secret</Radio>
                                        <Radio value="wallet" onClick={() => setShowWalletKey(true)}>Wallet Private Key</Radio>
                                    </RadioGroup>
                                )}
                            />
                            {showWalletKey ? (
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
                                </>
                            )}
                        </Box>
                    )}
                </> 
            )}           
        </>
    );
};

export default ConnectExchange;