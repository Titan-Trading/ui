import React, { useEffect, useState } from 'react';
import { Anchor, Button, Grid, Header, LoadingOverlay, Text } from '@mantine/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { hideLoading, setTitle, showLoading } from 'Redux/layout';
import { setRecentStrategies, setRecentIndicators, setRecentSignals } from 'Redux/lab';
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

const Lab = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { authed } = PATHS;
    const labStore = useSelector((state: any) => state.lab);
    const [ indicators, setIndicators] = useState<Array<any>>(labStore.recentIndicators);
    const [ strategies, setStrategies] = useState<Array<any>>(labStore.recentStrategies);
    const [ signals, setSignals] = useState<Array<any>>(labStore.recentSignals);

    useEffect(() => {
        // dispatch(showLoading());

        dispatch(setTitle('Lab'));

        Promise.all([getBots(), getIndicators()/*, getSignals()*/]).then((promises: any) => {
            if(promises[0]) {
                setStrategies(promises[0].data);
                dispatch(setRecentStrategies(promises[0].data));
            }
            if(promises[1]) {
                setIndicators(promises[1].data);
                dispatch(setRecentIndicators(promises[1].data));
            }
            if(promises[2]) {
                setSignals(promises[2].data);
                dispatch(setRecentSignals(promises[2].data));
            }

            // dispatch(hideLoading());
        });

        // load list of recent scripts for account from api
        // getRecentScripts().then(({data}) => {
        //     setProjects(data);
        // });
    }, []);

    const handleNewStrategy = () => {
        // send api request to create a new bot
        createBot().then(({data}) => {
            notifications.showNotification({
                title: 'Success!',
                message: 'Successfully created a new strategy',
            });
            // navigate to the builder using the newly created bot
            navigate(`/lab/projects/${data.id}`);
        });
    };

    const handleViewStrategy = (project: any) => {
        // navigate to the builder using the newly created bot
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
                setStrategies(filter(s => s.id !== strategy.id, strategies));
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

    const handleNewIndicator = () => {
        // send api request to create a new indicator
        createIndicator().then(({data}) => {
            notifications.showNotification({
                title: 'Success!',
                message: 'Successfully created a new indicator',
            });

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
                setIndicators(filter(i => i.id !== indicator.id, indicators));
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
        /*createSignal().then(({data}) => {
            // navigate to the builder using the newly created signal
            navigate(`/lab/signals/${data.id}`);
        });*/
    };

    const handleViewSignal = (signal: any) => {
        // navigate to the builder using the newly created signals
        navigate(`/lab/signals/${signal.id}`);
    };

    const openSignalConfirmModal = (signal: any) => modals.openConfirmModal({
        ...deleteModalSettings({
            type: 'signal'
        }),
        children: <DeleteModalText type="signal" />,
        onConfirm: () => {
            if (!signal.id) return;
            
            // deleteSignal(signal.id).then(() => {
                setSignals(filter(s => s.id !== signal.id, signals));
                modals.closeAll();
                notifications.showNotification({
                    title: 'Success!',
                    message: 'Successfully deleted signal',
                });
            /*}).catch(() => {
                modals.closeAll();
                notifications.showNotification({
                    title: 'Error!',
                    message: 'Failed to delete signal',
                    color: 'red'
                });
            });*/
    
            modals.openConfirmModal({
                ...deleteModalSettings({
                    type: 'signal'
                }),
                children: (
                    <>
                        <DeleteModalText type="signal" />
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
            {/* Page title and action buttons */}
            <Grid columns={12}>
                <Grid.Col span={6}>
                    <Text size="lg" weight="bold"></Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    {/* List of options for the page */}
                    <div className="lab-options" style={{textAlign: 'right'}}>
                        {/* Create a new bot/project */}
                        <Button onClick={() => handleNewStrategy()} style={{marginRight: 12}}>New strategy</Button>

                        {/* Create a new indicator */}
                        <Button onClick={() => handleNewIndicator()} style={{marginRight: 12}}>New indicator</Button>

                        {/* Create a new signal */}
                        <Button onClick={() => handleNewSignal()}>New signal</Button>
                    </div>
                </Grid.Col>
            </Grid>

            {/* List recent strategies */}
            <Text style={{marginTop: 12}}>Recent strategies</Text>
            <List
                loading={false}
                items={strategies}
                onView={handleViewStrategy}
                onDelete={openStrategyConfirmModal}
                emptyMessage={<EmptyMessage type="recent strategies" />}
            />

            {/* List recent indicators */}
            <Text style={{marginTop: 12}}>Recent indicators</Text>
            <List
                loading={false}
                items={indicators}
                onView={handleViewIndicator}
                onDelete={openIndicatorConfirmModal}
                emptyMessage={<EmptyMessage type="recent indicators" />}
            />

            {/* List recent signals */}
            <Text style={{marginTop: 12}}>Recent signals</Text>
            <List
                loading={false}
                items={signals}
                onView={handleViewSignal}
                onDelete={openSignalConfirmModal}
                emptyMessage={<EmptyMessage type="recent signals" />}
            />
        </>
    )
};

export default Lab;