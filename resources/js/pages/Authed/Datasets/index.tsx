
import React, { useEffect, useState } from 'react';
import { Anchor, Breadcrumbs, Button, LoadingOverlay, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { hideLoading, setTitle, showLoading } from 'Redux/layout';
import { getDatasets } from 'API/datasets';
import List from 'Components/List';
import { useModals } from '@mantine/modals';
import { filter } from 'ramda';
import { useNotifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import SearchInput from 'Components/SearchInput';
import ProductList from '../Marketplace/ProductList';


const Datasets = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { authed } = PATHS;
    const [ datasets, setDatasets] = useState<Array<any>>([]);

    useEffect(() => {
        dispatch(setTitle('Datasets'));

        // load list of datasets available from api
        getDatasets().then(({data}) => {

            const updatedDatasets = data.map((dataset: any) => ({
                id: dataset.id,
                image: '',
                title: dataset.name,
                description: '',
                stats: [{
                    title: 'Stats',
                    value: '100'
                }]
            }));


            setDatasets(updatedDatasets);
        });
    }, []);

    const handleViewDataset = (dataset: any) => {
        // navigate to the dataset product page
        navigate(`/datasets/${dataset.id}`);
    };

    const items = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
            title: 'Strategy 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            stats: [{
                title: 'Stats',
                value: '100'
            }]
        }
    ];

    
    return (
        <>
            {/* Show search */}
            <SearchInput placeholder="Search datasets..." />
            
            {/* Show product list */}
            <ProductList items={datasets} />

            {/* Show pagination */}
        </>
    )
};

export default Datasets;