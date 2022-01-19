import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
<<<<<<< Updated upstream
=======
import { InputWrapper, Input, PasswordInput, Button, Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
>>>>>>> Stashed changes

import { login } from '../../../api/user';
import { setUser } from '../../../redux/user';

import './style.scss';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const submit = (data) => {
        login({ ...data }).then(({ data }) => {
            dispatch(setUser(data));
            window.location.reload();
        }).catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
<<<<<<< Updated upstream
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" {...register('email', {  required: true })} />
                {errors.email && <span className="error">This field is required</span>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" {...register('password', { required: true })} />
                {errors.password && <span className="error">This field is required</span>}
            </div>
            <div className="form-group">
                <button type="submit">Submit</button>
            </div>
=======
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
                id="email"
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
                id="password"
                required
                label="Password"
                error={errors.password && "Password is required"}
                sx={(theme) => ({
                    marginBottom: theme.spacing.lg
                })}
            >
                <PasswordInput id="password" type="password" {...register('password', {  required: true })} />
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
>>>>>>> Stashed changes
        </form>
    )
}

export default Login;