import { TextInput, TextInputProps, ActionIcon, useMantineTheme, createStyles } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import React from 'react';

const useStyles = createStyles((theme) => ({
    container: {
        padding: `${theme.spacing.xl}px ${theme.spacing.xl}px`,
    },

}));

export default function SearchInput(props: TextInputProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
  
    return (
        <div className={classes.container}>
            <TextInput
                icon={<IconSearch size={18} stroke={1.5} />}
                radius="xl"
                size="md"
                rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                    {theme.dir === 'ltr' ? (
                    <IconArrowRight size={18} stroke={1.5} />
                    ) : (
                    <IconArrowLeft size={18} stroke={1.5} />
                    )}
                </ActionIcon>
                }
                placeholder={props.placeholder ? props.placeholder : 'Search items...'}
                rightSectionWidth={42}
                {...props}
            />
        </div>
    );
}