import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Button, Alert, Text, Space } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from 'API/users';
import { setUser } from 'Redux/user';
import { Input } from 'Components/Forms';
import { PATHS } from 'Paths';

export interface IRegisterFormData {
    name: string;
    email: string;
    password: string;
}

const Signup = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);
    const { authed } = PATHS;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (data: IRegisterFormData) => {
        setLoading(true);

        signup(data).then(({ data }: any) => {
            // dispatch(setUser(data));

            // navigate(authed.dashboard);
        }).catch((err: any) => {
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
            Sign up for a new account
        </Text>
        <Space h={30} />

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
                label='Name'
                error={errors.name && 'Name is required'}
                {...register('name', {  required: true })}
            />
            
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
                Sign Up
            </Button>
            
            <Link to="/login">
                <Button variant="subtle">
                    Already have an account?
                </Button>
            </Link>
        </form>
    </>);
}

export default Signup;