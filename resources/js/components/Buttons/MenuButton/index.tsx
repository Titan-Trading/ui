import React from 'react';
import { UnstyledButton, Group, Text } from '@mantine/core';

interface ICustomButton {
    active: boolean;
    text: string;
    icon: any;
}

const CustomButton = ({ active = false, text, icon }: ICustomButton) => {
    return (
        <UnstyledButton 
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.sm,
                marginBottom: theme.spacing.sm,
                borderRadius: '4px',
                backgroundColor: active ? theme.colors.gray[2] : 'transparent',
                '&:hover': {
                    backgroundColor: theme.colors.gray[2]
                },
            })}
        >
            <Group>
                {icon} 
                {text ?? <Text>
                    {text}
                </Text>}
            </Group>
            
        </UnstyledButton>
    );
};

export default CustomButton;