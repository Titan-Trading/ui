import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
    InputWrapper, 
    PasswordInput, 
    Button, 
    Grid,
} from '@mantine/core';


const PasswordForm = () => {
    const [ loading, setLoading ] = useState(false);
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();

    const submit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(submit)}>

            <Grid gutter="xl">
                <Grid.Col md={4}>
                    <InputWrapper
                        label="Password"
                        required
                        error={errors.password && "Password is required"}
                    >
                        <PasswordInput {...register('password', {  required: true })} />
                    </InputWrapper> 
                </Grid.Col>
                <Grid.Col md={4}>
                <InputWrapper
                        label="Password Confirmation"
                        required
                        error={errors.passwordConfirmation && "Password Confirmation is required"}
                    >
                        <PasswordInput {...register('passwordConfirmation', {  required: true })} />
                    </InputWrapper> 
                </Grid.Col>
                <Grid.Col span={12}>
                    <Button 
                        type="submit"
                        color="blue"
                        loading={loading}
                    >
                        Change Password
                    </Button>
                </Grid.Col>
            </Grid>
        </form>
    )
};

export default PasswordForm;