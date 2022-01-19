import React from 'react';
import { Title, Box, Divider } from '@mantine/core';

import PasswordForm from './PasswordForm';

const Account = () => {
    return (
        <>
            <Title order={2} style={{ marginBottom: '25px' }}>Change Password</Title>
            <Box>
                <PasswordForm />
            </Box>

            <Divider 
                style={{
                    marginTop: "100px",
                    marginBottom: "100px"
                }}
            />
        </>
    );
};

export default Account;