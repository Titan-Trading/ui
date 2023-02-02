import React, { useEffect, useState } from 'react';
import { Anchor, Breadcrumbs, Button, LoadingOverlay, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { hideLoading, setTitle, showLoading } from 'Redux/layout';
import { getSupportTickets } from 'API/supportTickets';
import List from 'Components/List';
import { useModals } from '@mantine/modals';
import { filter } from 'ramda';
import { useNotifications } from '@mantine/notifications';
import { createIndicator, deleteIndicator, getIndicators } from 'API/indicators';
import { Link } from 'react-router-dom';

const SupportTicket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { authed } = PATHS;
    const [ supportTickets, setSupportTickets] = useState<Array<any>>([]);

    useEffect(() => {
        // dispatch(showLoading());

        dispatch(setTitle('Support'));

        // load list of support tickets for account from api
        getSupportTickets().then(({data}) => {
            setSupportTickets(data);
        });
    }, []);

    return (
        <>
            
        </>
    )
};

export default SupportTicket;