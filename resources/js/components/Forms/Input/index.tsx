import React, { forwardRef } from 'react';
import { 
    InputWrapper, 
    Input as MantineInput, 
    PasswordInput, 
    Textarea 
} from '@mantine/core';

import './style.scss';

interface IInput {
    label: string;
    type?: string;
    error?: string;
    required?: boolean;
}

const Input = forwardRef(({ label, type = 'text', error, required = false, ...rest }: IInput, ref: any) => {

    const renderInput = () => {
        if (type === 'password') {
            return <PasswordInput {...rest} />;
        } else if (type === 'textarea') {
            return <Textarea {...rest} />;
        } else {
            return <MantineInput type={type} {...rest} />;
        }
    };

    return (
        <InputWrapper
            ref={ref}
            required={required}
            label={label}
            error={error}
            sx={(theme) => ({
                marginBottom: theme.spacing.lg
            })}
        >
            {renderInput()}
        </InputWrapper>
    )
});

export default Input;