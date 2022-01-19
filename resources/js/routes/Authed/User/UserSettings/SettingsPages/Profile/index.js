import React from 'react';
import { Title, Box, Divider } from '@mantine/core';

import UserForm from './UserForm'; 

const Profile = () => {
    return (
        <>
            <Title order={2} style={{ marginBottom: '25px' }}>User Information</Title>
            <Box>
                <UserForm />
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

export default Profile;