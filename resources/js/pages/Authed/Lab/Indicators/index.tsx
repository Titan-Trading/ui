import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'Paths';
import { setTitle } from 'Redux/layout';
import { createIndicator, deleteIndicator, getIndicators } from 'API/indicators';
import { Button, Grid, LoadingOverlay, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useNotifications } from '@mantine/notifications';
import { filter } from 'ramda';
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


const Indicators = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    // const { id } = useParams();
    const { authed } = PATHS;
    const [indicators, setIndicators] = useState<Array<any>>([]);

    // load indicators from api
    useEffect(() => {
        dispatch(setTitle(`Indicators`));

        getIndicators().then(({data}) => {
            setIndicators(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

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

    return (
        <>
            <h1>Indicators</h1>

            {/* Page title and action buttons */}
            <Grid columns={12} style={{marginBottom: 12}}>
                <Grid.Col span={6}>
                    <Text size="lg" weight="bold"></Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    {/* List of options for the page */}
                    <div className="indicator-options" style={{textAlign: 'right'}}>
                        {/* Create a new indicator */}
                        <Button onClick={() => handleNewIndicator()} style={{marginRight: 12}}>New indicator</Button>
                    </div>
                </Grid.Col>
            </Grid>

            <List
                loading={false}
                items={indicators}
                onView={handleViewIndicator}
                onDelete={openIndicatorConfirmModal}
                emptyMessage={<EmptyMessage type="indicators" />}
            />
        </>
    )
};

export default Indicators;