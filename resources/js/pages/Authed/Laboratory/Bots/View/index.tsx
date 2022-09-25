import React, { useEffect, useState } from 'react';
import { Grid, LoadingOverlay, Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetBot } from 'API/bots';
import paths from 'Paths';
import ViewList, { IListItem } from 'Components/ViewList';

const ViewBot = () => {
    const params =  useParams();
    const [ listItems, setListItems ] = useState<IListItem[]>([])
    const { data, isLoading, error } = useGetBot(params.id);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            showNotification({
                title: 'Error!',
                message: 'Failed to retrieve bot',
                color: 'red'
            });
        }
    }, [ error ]);

    useEffect(() => {
        if (data?.data) {
            const { name, algorithm_text, parameter_options } = data.data;
            setListItems([
                {
                    title: 'Name',
                    content: name
                },
                {
                    title: 'Algorithm',
                    content: algorithm_text,
                    isCode: true
                },
                {
                    title: 'Parameters',
                    content: JSON.parse(parameter_options),
                    isArray: true
                },
            ]);
        }
    }, [ data ])
    
    return (
        <Grid>
            <LoadingOverlay visible={isLoading} />
            <Grid.Col span={6}>
                <ViewList listItems={listItems} />
                <Button 
                    role="link" 
                    color="cyan" 
                    onClick={() => navigate(paths.authed.laboratory.bots.editBuilder(params.id))}
                >
                    Edit Bot
                </Button>
            </Grid.Col>
        </Grid>
    )
};

export default ViewBot;