import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Button, Alert, Space, Text } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import { forgotPassword } from 'API/users';
import { setUser } from 'Redux/user';
import { Input } from 'Components/Forms';
import { PATHS } from 'Paths';

export interface IForgotPasswordFormData {
    email: string;
}

const ForgotPassword = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
    const { authed } = PATHS;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (data: IForgotPasswordFormData) => {
        setLoading(true);

        forgotPassword(data).then(({ data }: any) => {
            // dispatch(setUser(data));

            // navigate(authed.dashboard);
        }).catch((err) => {
            console.log(err);

            setLoading(false);
            setError(true);
        });
    };

    return (<>
        <Text 
            color="dimmed"
            sx={(theme) => ({
                marginBottom: theme.spacing.xl
            })}
        >
            Forgot password
        </Text>
        <Text>
            Enter your email address and we'll send you a link to reset your password.
        </Text>
        <Space h={24} />

        <form onSubmit={handleSubmit(submit)}>
            {error && (
                <Alert 
                    icon={<HiXCircle />}
                    color="red"
                    sx={(theme) => ({
                        marginBottom: theme.spacing.lg
                    })}
                >
                    Incorrect Email
                </Alert>
            )}
            
            <Input
                required
                label='Email'
                error={errors.email && 'Email is required'}
                {...register('email', {  required: true })}
            />

            <Button 
                type="submit"
                sx={(theme) => ({
                    marginRight: theme.spacing.sm,
                    backgroundColor: theme.colors.charcoal,
                    '&:hover': {
                        backgroundColor: theme.colors.charcoal[0],
                    },
                })}
                loading={loading}
            >
                Forgot Password
            </Button>
            
            <Link to="/login">
                <Button variant="subtle">
                    Go back to login
                </Button>
            </Link>
        </form>
    </>)
}

export default ForgotPassword;