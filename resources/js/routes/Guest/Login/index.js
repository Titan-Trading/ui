import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'

import { InputWrapper, Input, PasswordInput, Button, Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { login } from '../../../api/users';
import { setUser } from '../../../redux/user';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const dispatch = useDispatch();

    const submit = (data) => {
        setLoading(true);
        login({ ...data }).then(({ data }) => {
            dispatch(setUser(data));
            window.location.reload();
        }).catch((err) => {
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

            <InputWrapper
                required
                label="Email"
                error={errors.email && "Email is required"}
                sx={(theme) => ({
                    marginBottom: theme.spacing.lg
                })}
            >
                <Input id="email" type="email" {...register('email', {  required: true })} />
            </InputWrapper>

            <InputWrapper
                required
                label="Password"
                error={errors.password && "Password is required"}
                sx={(theme) => ({
                    marginBottom: theme.spacing.lg
                })}
            >
                <PasswordInput {...register('password', {  required: true })} />
            </InputWrapper>

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