import React, { useEffect, useState } from 'react';
import { Anchor, Button, Grid, Header, LoadingOverlay, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { hideLoading, setTitle, showLoading } from 'Redux/layout';
import { createBot, deleteBot, getBots } from 'API/bots';
import List from 'Components/List';
import { useModals } from '@mantine/modals';
import { filter } from 'ramda';
import { useNotifications } from '@mantine/notifications';
import { createIndicator, deleteIndicator, getIndicators } from 'API/indicators';


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

const WarRoom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { authed } = PATHS;
    const [ scripts, setScripts] = useState<Array<any>>([]);

    useEffect(() => {
        // dispatch(showLoading());

        dispatch(setTitle('Live Trading'));

        // Promise.all([getBots(), getIndicators()]).then((promises: any) => {
        //     if(promises[0]) {
        //         setProjects(promises[0].data);
        //     }
        //     if(promises[1]) {
        //         setIndicators(promises[1].data);
        //     }

        //     dispatch(hideLoading());
        // });

        // load list of recent scripts for account from api
        // getRecentScripts().then(({data}) => {
        //     setProjects(data);
        // });
    }, []);

    const handleNewProject = () => {
        // send api request to create a new bot
        createBot().then(({data}) => {
            // navigate to the builder using the newly created bot
            navigate(`/lab/projects/${data.id}`);
        });
    };

    const handleViewProject = (project: any) => {
        // navigate to the builder using the newly created bot
        navigate(`/lab/projects/${project.id}`);
    };

    const openProjectConfirmModal = (bot: any) => modals.openConfirmModal({
        ...deleteModalSettings({
            type: 'project'
        }),
        children: <DeleteModalText type="project" />,
        onConfirm: () => {
            if (!bot.id) return;
            
            deleteBot(bot.id).then(() => {
                setScripts(filter(b => b.id !== bot.id, scripts));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted project',
                });
            }).catch(() => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete project',
                    color: 'red'
                });
            });
    
            modals.openConfirmModal({
                ...deleteModalSettings({
                    type: 'project'
                }),
                children: (
                    <>
                        <DeleteModalText type="project" />
                        <LoadingOverlay visible={true} />
                    </>
                ),
                closeOnCancel: false,
                closeOnClickOutside: false,
                closeOnEscape: false
            });
        }
    });

    const handleNewIndicator = () => {
        // send api request to create a new indicator
        createIndicator().then(({data}) => {
            // navigate to the builder using the newly created indicator
            navigate(`/lab/indicators/${data.id}`);
        });
    };

    const handleViewIndicator = (indicator: any) => {
        // navigate to the builder using the newly created indicator
        navigate(`/lab/indicators/${indicator.id}`);
    };

    const openIndicatorConfirmModal = (indicator: any) => modals.openConfirmModal({
        ...deleteModalSettings({
            type: 'indicator'
        }),
        children: <DeleteModalText type="indicator" />,
        onConfirm: () => {
            if (!indicator.id) return;
            
            deleteIndicator(indicator.id).then(() => {
                setScripts(filter(i => i.id !== indicator.id, scripts));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted indicator',
                });
            }).catch(() => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete indicator',
                    color: 'red'
                });
            });
    
            modals.openConfirmModal({
                ...deleteModalSettings({
                    type: 'indicator'
                }),
                children: (
                    <>
                        <DeleteModalText type="indicator" />
                        <LoadingOverlay visible={true} />
                    </>
                ),
                closeOnCancel: false,
                closeOnClickOutside: false,
                closeOnEscape: false
            });
        }
    });

    const handleNewSignal = () => {
        // send api request to create a new signal
        // createSignal().then(({data}) => {
        //     // navigate to the builder using the newly created signal
        //     navigate(`/lab/signals/${data.id}`);
        // });
    };

    return (
        <>
            <Grid columns={12}>
                <Grid.Col span={6}>
                    <Text size="lg" weight="bold"></Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    {/* List of options for the page */}
                    <div className="lab-options" style={{textAlign: 'right'}}>
                        {/* Create a new bot/project */}
                        <Button onClick={() => handleNewProject()} style={{marginRight: 12}}>New strategy</Button>

                        {/* Create a new indicator */}
                        <Button onClick={() => handleNewIndicator()} style={{marginRight: 12}}>New indicator</Button>

                        {/* Create a new signal */}
                        <Button onClick={() => handleNewSignal()}>New signal</Button>
                    </div>
                </Grid.Col>
            </Grid>
            
            

            {/* List recent scripts (strategies or indicators) */}
            <List
                loading={false}
                items={scripts}
                onView={handleViewIndicator}
                onDelete={openIndicatorConfirmModal}
                emptyMessage={<EmptyMessage type="recent scripts" />}
            />
        </>
    )
};

export default WarRoom;