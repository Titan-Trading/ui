import React, { useEffect, useState } from 'react';
import { Anchor, Button, LoadingOverlay, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'Paths';
import { hideLoading, setTitle, showLoading } from 'Redux/layout';
import { getProducts } from 'API/products';
import List from 'Components/List';
import { useModals } from '@mantine/modals';
import { filter } from 'ramda';
import { useNotifications } from '@mantine/notifications';
import { Link } from 'react-router-dom';
import FeaturedProduct from './FeaturedProduct';
import ProductList from './ProductList'
import Search from 'Components/SearchInput';
import SearchInput from 'Components/SearchInput';


const Marketplace = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useModals();
    const notifications = useNotifications();
    const { authed } = PATHS;
    const [ products, setProducts] = useState<Array<any>>([]);

    useEffect(() => {
        // dispatch(showLoading());

        dispatch(setTitle('Marketplace'));

        // load list of projducts from marketplace api
        getProducts().then(({data}) => {
            setProducts(data);
        });

    }, []);

    const handleViewProduct = (product: any) => {
        // navigate to the builder using the newly created bot
        navigate(`/products/${product.id}`);
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
            {/* Show top featured product */}
            {/* <FeaturedProduct
                id={1}
                image='https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
                title='Strategy 1'
                description='This is a just a really long description that is going to be used to test the layout of the featured product component.'
                userName='Ryan Coble'
                price={100.00}
                stats={[{
                    title: 'Stats',
                    value: '100'
                }]}
            /> */}

            {/* Show search */}
            <SearchInput />

            {/* Show product list */}
            <ProductList items={products} />

            {/* Show pagination */}
        </>
    )
};

export default Marketplace;