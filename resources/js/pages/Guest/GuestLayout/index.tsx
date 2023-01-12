import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Box, Title, Text, Space } from '@mantine/core';
import { PATHS } from 'Routes/index';
import Compass from 'Images/compass.jpg';

import './style.scss';

const GuestLayout = () => {
    const userStore = useSelector((store: any) => store.user);
    const { guest, authed } = PATHS;
    const navigate = useNavigate();

    useEffect(() => {
        if(userStore) {
            navigate(authed.dashboard);
            return;
        }
    }, []);

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Grid gutter={0} sx={{
                flex: 1
            }}>
                <Grid.Col className="image-container" span={7} sx={(theme) => ({
                    backgroundColor: theme.colors.charcoal
                })}>
                    <img src={Compass} alt="Compass and map" />
                </Grid.Col>
                <Grid.Col span={5} sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Box
                        sx={(theme) => ({
                            padding: theme.spacing.md,
                            marginLeft: '10%',
                            minWidth: '50%'
                        })}
                    >
                        <Title 
                            order={1}
                            sx={(theme) => ({
                                marginBottom: theme.spacing.xs
                            })}
                        >
                            Simple Trader
                        </Title>
                        <Text 
                            color="dimmed"
                            sx={(theme) => ({
                                marginBottom: theme.spacing.xl
                            })}
                        >
                            Login
                        </Text>
                        <Space h={30} />
                        <Outlet />
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
    );
};

export default GuestLayout;