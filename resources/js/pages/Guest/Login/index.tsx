import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Button, Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import { login } from 'API/users';
import { setUser } from 'Redux/user';
import { Input } from 'Components/Forms';
import { PATHS } from 'Paths';

export interface ILoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
    const { authed } = PATHS;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (data: ILoginFormData) => {
        setLoading(true);

        login(data).then(({ data }: any) => {
            dispatch(setUser(data));

            navigate(authed.dashboard);
        }).catch((err) => {
            console.log(err);

            setLoading(false);
            setError(true);
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            {error && (
                <Alert 
                    icon={<HiXCircle />}
                    color="red"
                    sx={(theme) => ({
                        marginBottom: theme.spacing.lg
                    })}
                >
                    Incorrect Email or Password
                </Alert>
            )}
            
            <Input
                required
                label='Email'
                error={errors.email && 'Email is required'}
                {...register('email', {  required: true })}
            />

            <Input
                required
                label='Password'
                type="password"
                error={errors.password && 'Password is required'}
                {...register('password', {  required: true })}
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
                Log In
            </Button>
            
            <Link to="/forgot-password">
                <Button variant="subtle">
                    Forgot Password
                </Button>
            </Link>
        </form>
    )
}

export default Login;