import React from 'react';
import { useController } from 'react-hook-form';
import { Select as MantineSelect, InputWrapper } from '@mantine/core';

import { IOption } from '..';

interface ISelect {
    name: string;
    label: string;
    control: any;
    rules: any;
    options: IOption[];
    required?: boolean;
    error: any;
}

const Select = ({ name, label, control, rules, options, required, error }: ISelect) => {
    const { field } = useController({ name, control, rules });

    return (
        <InputWrapper
            required={required}
            label={label}
            error={error}
            sx={(theme) => ({
                marginBottom: theme.spacing.lg
            })}
        >
            <MantineSelect
                data={options}
                {...field}
            />
        </InputWrapper>
    )
};

export default Select;