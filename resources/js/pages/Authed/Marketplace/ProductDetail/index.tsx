import React, { useEffect, useState } from 'react';
import { Anchor, Button, LoadingOverlay, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { hideLoading, setTitle, showLoading } from 'Redux/layout';
import { createBot, deleteBot, getBots } from 'API/bots';
import List from 'Components/List';
import { useModals } from '@mantine/modals';
import { filter } from 'ramda';
import { useNotifications } from '@mantine/notifications';



const ProductDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { authed } = PATHS;
    const [ product, setProduct] = useState<Array<any>>([]);

    useEffect(() => {
        dispatch(setTitle('Product Detail'));
    }, []);

    const items = [
    ];

    return (
        <>
            {/* Show general product info */}

            {/* Call-to-action purchase the product */}

            {/* Show stats */}

            {/* Show reviews */}
        </>
    )
};

export default ProductDetail;