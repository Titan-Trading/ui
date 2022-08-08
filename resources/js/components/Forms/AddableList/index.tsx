import React, { useEffect } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Button, Grid, Tooltip } from '@mantine/core';
import { BsPlus, BsXCircleFill } from 'react-icons/bs';
import { path } from 'ramda';

import { Input } from '..';

import './style.scss';

interface IAddableList {
    label: string;
    name: string;
    form: UseFormReturn;
    initialLoad: boolean;
    setInitialLoad: any;
    required?: boolean;
}

const AddableList = ({ label, name, form, initialLoad, setInitialLoad, required }: IAddableList) => {
    const upperName = name.charAt(0).toUpperCase() + name.slice(1);
    const { fields, append, remove } = useFieldArray({ 
        control: form.control, 
        name: name
    });

    // add one field ready to be typed in if on initial load
    useEffect(() => {
        if (fields.length === 0) {
            if (!initialLoad) {
                form.clearErrors(name);
            } else {
                append({ value: '' });
                setInitialLoad(false);
            }
        }
    }, [ fields ]);

    const hasError = (i: number): boolean => {
        const errorExists = path([ 'formState', 'errors', name ], form);
        const indexHasError = path([ 'formState', 'errors', name, i ], form);

        if (errorExists && indexHasError) return true;

        return false;
    }

    return (
        <>
            <p>{upperName}</p>
            <ul className="addable-list">
                {fields.length > 0 && fields.map((field, i) => (
                    <li key={i}>
                        <Grid>
                            <Grid.Col span={11}>
                                <Input
                                    required={required}
                                    label={label}
                                    key={`${field.id}-${name}`}
                                    error={hasError(i) && `${upperName} is required`}
                                    {...form.register(`${name}.${i}.value`, { required: true })} 
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <span className="remove-button" role="button" onClick={() => remove(i)}>
                                    <Tooltip label="Remove">
                                        <BsXCircleFill />
                                    </Tooltip>
                                </span>
                            </Grid.Col>
                        </Grid>
                    </li>
                ))}
            </ul>
            <div className="add-button-container">
                <Button variant="subtle" onClick={() => append({ value: '' })}>
                    <BsPlus />&nbsp;Add {upperName}
                </Button>
            </div>
        </>
    )
};

export default AddableList;