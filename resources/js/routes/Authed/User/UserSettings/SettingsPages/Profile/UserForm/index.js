import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
    Avatar, 
    InputWrapper, 
    Input, 
    Button, 
    Grid,
} from '@mantine/core';


const UserForm = () => {
    const [ loading, setLoading ] = useState(false);
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();

    const submit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(submit)}>

            <Grid gutter="xl">
                <Grid.Col span={12}>
                    <Avatar 
                        src={null} 
                        alt="Profile Picture" 
                        radius="100%" 
                        size="xl"
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <InputWrapper
                        label="Name"
                        required
                        error={errors.name && "Name is required"}
                    >
                        <Input {...register('name', {  required: true })} />
                    </InputWrapper> 
                </Grid.Col>
                <Grid.Col md={4}>
                    <InputWrapper
                        label="Email"
                        required
                        error={errors.name && "Email is required"}
                    >
                        <Input {...register('email', {  required: true })} />
                    </InputWrapper> 
                </Grid.Col>
                <Grid.Col span={12}>
                    <Button 
                        type="submit"
                        color="blue"
                        loading={loading}
                    >
                        Save Info
                    </Button>
                </Grid.Col>
            </Grid>
        </form>
    )
};

export default UserForm;