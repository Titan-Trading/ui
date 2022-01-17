import React from 'react';
import { Center, Image } from '@mantine/core';

import Logo from '../../../../../../images/logo.svg';

const Brand = () => {
    return (
        <Center
            sx={(theme) => ({
                padding: theme.spacing.md,
                paddingTop: 0
            })}
        >
            <Image 
                sx={{
                    maxWidth: '90px'
                }}
                src={Logo} 
                alt="Simple Trader logo" 
            />
        </Center>
    );
};

export default Brand;