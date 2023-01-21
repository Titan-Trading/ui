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

const LiveTrading = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { authed } = PATHS;
    const [ strategies, setStrategies] = useState<Array<any>>([]);

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
        /*getLiveStrategies()*/getBots().then(({data}) => {
            setStrategies(data);
        });
    }, []);

    const handleNewStrategy = () => {
        // send api request to create a new bot
        createBot().then(({data}) => {
            // navigate to the builder using the newly created bot
            navigate(`/live-trading/strategies/${data.id}`);
        });
    };

    const handleViewStrategy = (strategy: any) => {
        // navigate to the builder using the newly created bot
        navigate(`/live-trading/strategies/${strategy.id}`);
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
                    <div className="live-options" style={{textAlign: 'right'}}>
                        
                    </div>
                </Grid.Col>
            </Grid>
            
            

            {/* List live strategies */}
            <List
                loading={false}
                items={strategies}
                onView={handleViewStrategy}
                onDelete={openStrategyConfirmModal}
                emptyMessage={<EmptyMessage type="live strategies" />}
            />
        </>
    )
};

export default LiveTrading;