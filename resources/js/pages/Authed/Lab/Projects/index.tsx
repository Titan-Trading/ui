import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { Anchor, Button, Grid, LoadingOverlay, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { createBot, deleteBot, getBots } from 'API/bots';
import { filter } from 'ramda';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import List from 'Components/List';

const EmptyMessage = (props: any) => {
    return (
        <p>
            No <strong>{props.type}</strong> exist
        </p>
    );
};

const deleteModalSettings = (props: any) => ({
    title: 'Are you sure?',
    labels: { confirm: 'Delete ' + props.type, cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    closeOnConfirm: false,
});

const DeleteModalText = (props: any) => (
    <Text size="sm">
        Once this {props.type} is deleted, it cannot be recovered and this 
        action cannot be undone.
    </Text>
);

const Projects = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { id } = useParams();
    const { authed } = PATHS;
    const [strategies, setStrategy] = useState<Array<any>>([]);

    // load projects from api
    useEffect(() => {
        dispatch(setTitle(`Strategies`));

        getBots().then(({data}) => {
            setStrategy(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleNewStrategy = () => {
        // send api request to create a new project
        createBot().then(({data}) => {
            // navigate to the builder using the newly created project
            navigate(`/lab/projects/${data.id}`);
        });
    };

    const handleViewStrategy = (project: any) => {
        // navigate to the builder using the newly created project
        navigate(`/lab/projects/${project.id}`);
    };

    const openStrategyConfirmModal = (strategy: any) => modals.openConfirmModal({
        ...deleteModalSettings({
            type: 'strategy'
        }),
        children: <DeleteModalText type="strategy" />,
        onConfirm: () => {
            if (!strategy.id) return;
            
            deleteBot(strategy.id).then(() => {
                setStrategy(filter(s => s.id !== strategy.id, strategies));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted strategy',
                });
            }).catch(() => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete strategy',
                    color: 'red'
                });
            });
    
            modals.openConfirmModal({
                ...deleteModalSettings({
                    type: 'strategy'
                }),
                children: (
                    <>
                        <DeleteModalText type="strategy" />
                        <LoadingOverlay visible={true} />
                    </>
                ),
                closeOnCancel: false,
                closeOnClickOutside: false,
                closeOnEscape: false
            });
        }
    });

    return (
        <>
            <h1>Strategies</h1>

            {/* Page title and action buttons */}
            <Grid columns={12} style={{marginBottom: 12}}>
                <Grid.Col span={6}>
                    <Text size="lg" weight="bold"></Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    {/* List of options for the page */}
                    <div className="strategy-options" style={{textAlign: 'right'}}>
                        {/* Create a new strategy */}
                        <Button onClick={() => handleNewStrategy()} style={{marginRight: 12}}>New strategy</Button>
                    </div>
                </Grid.Col>
            </Grid>

            <List
                loading={false}
                items={strategies}
                onView={handleViewStrategy}
                onDelete={openStrategyConfirmModal}
                emptyMessage={<EmptyMessage type="strategies" />}
            />
        </>
    )
};

export default Projects;