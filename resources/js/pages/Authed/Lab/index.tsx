import React, { useEffect, useState } from 'react';
import { Anchor, Breadcrumbs, Button, LoadingOverlay, Text } from '@mantine/core';
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
import { Link } from 'react-router-dom';


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
    const breadCrumbItems = [
        {title: 'Dashboard', href: `/`},
        {title: 'Lab', href: null}
    ];
    const [ breadCrumbs, setBreadCrumbs ] = useState<any>([]);
    const [ projects, setProjects] = useState<Array<any>>([]);
    const [ indicators, setIndicators] = useState<Array<any>>([]);

    useEffect(() => {
        // dispatch(showLoading());

        const crumbs = breadCrumbItems.map((item, index) => (
            item.href ? <Link to={item.href} key={index}>{item.title}</Link> : <Text key={index}>{item.title}</Text>
        ));
        setBreadCrumbs(crumbs);

        dispatch(setTitle('Lab'));

        // Promise.all([getBots(), getIndicators()]).then((promises: any) => {
        //     if(promises[0]) {
        //         setProjects(promises[0].data);
        //     }
        //     if(promises[1]) {
        //         setIndicators(promises[1].data);
        //     }

        //     dispatch(hideLoading());
        // });

        // load list of projects for account from api
        getBots().then(({data}) => {
            setProjects(data);
        });

        // load list of indicators for account from api
        getIndicators().then(({data}) => {
            setIndicators(data);
        });
    }, []);

    const handleNewProject = () => {
        // send api request to create a new bot
        createBot().then(({data}) => {
            // navigate to the builder using the newly created bot
            navigate(`/projects/${data.id}`);
        });
    };

    const handleViewProject = (project: any) => {
        // navigate to the builder using the newly created bot
        navigate(`/projects/${project.id}`);
    };

    const openProjectConfirmModal = (bot: any) => modals.openConfirmModal({
        ...deleteModalSettings({
            type: 'project'
        }),
        children: <DeleteModalText type="project" />,
        onConfirm: () => {
            if (!bot.id) return;
            
            deleteBot(bot.id).then(() => {
                setProjects(filter(b => b.id !== bot.id, projects));
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
            navigate(`/indicators/${data.id}`);
        });
    };

    const handleViewIndicator = (indicator: any) => {
        // navigate to the builder using the newly created indicator
        navigate(`/indicators/${indicator.id}`);
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
            <Breadcrumbs className="breadcrumb-container">{breadCrumbs}</Breadcrumbs>

            {/* Create a new bot/project */}
            <Button onClick={() => handleNewProject()}>Create new project</Button>

            {/* List existing bots/projects */}
            <List
                loading={false}
                items={projects}
                onView={handleViewProject}
                onDelete={openProjectConfirmModal}
                emptyMessage={<EmptyMessage type="projects" />}
            />

            {/* Create a new indicator */}
            <Button onClick={() => handleNewIndicator()}>Create new indicator</Button>

            {/* List existing bots/projects */}
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

export default Lab;