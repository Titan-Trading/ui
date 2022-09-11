import React from 'react';
import { useController } from 'react-hook-form';
import { Select as MantineSelect, Input } from '@mantine/core';

import { IFormRequirements, IOption } from '..';

interface ISelect extends IFormRequirements {
    options: IOption[];
}

const Select = ({ name, label, control, rules, options, required, error }: ISelect) => {
    const { field } = useController({ name, control, rules });

    return (
        <Input.Wrapper
            required={required}
            label={label}
            error={error}
            sx={(theme) => ({
                marginBottom: theme.spacing.lg
            })}
        >
            <MantineSelect
                data={options}
                searchable
                nothingFound="No results found"
                {...field}
            />
        </Input.Wrapper>
    )
};

export default Select;