import React from 'react';
import { render } from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import LogRocket from 'logrocket';
import {io} from 'socket.io-client';
import JsonParser from 'socket.io-json-parser';

import rootReducer from './redux';
import { showLoading, hideLoading, setError } from './redux/layout';
import AppEntry from './components/AppEntry'

import '../scss/app.scss';
import { getConnectToken } from 'API/connectApiTokens';
import { getExchangeAccounts } from 'API/exchangeAccounts';
import userStore from './redux/user';

// LogRocket.init('');

const store = configureStore({ reducer: rootReducer });
window.globalDispatch = store.dispatch;

axios.interceptors.request.use((config) => {
    if (!config.skipLoader) {
        window.globalDispatch(showLoading());
    }
    window.globalDispatch(setError(null));
    return config;
});

axios.interceptors.response.use((response) => {
    window.globalDispatch(hideLoading());
    return response;
}, (error) => {
    const originalRequest = error.config;
    window.globalDispatch(setError('There was an error fulfilling your request'));
    window.globalDispatch(hideLoading());
    return Promise.reject(error);
});


const user = localStorage.getItem('user') || null;
if(user) {
    getConnectToken().then(res => {
        const socket = io(process.env.WEBSOCKET_SERVER_URL, {
            auth: {
                token: res.data.access_token
            },
            parser: JsonParser
        });
    
        socket.on('message', (message) => {
            console.log(message.data);
        });
    
        socket.on('channel_joined', (message) => {
            console.log(message);
        });
        
        socket.on('connect', () => {
            console.log('connected to server!');
    
            const symbol = 'ETH-USDT';
    
            getExchangeAccounts().then((res) => {
                if(res.data.length) {
                    for(let iA in res.data) {
                        socket.emit('join_channel', 'EXCHANGE_ACCOUNT_DATA:TRADE_UPDATE:' + res.data[iA].id);
                    }
                }
            })
    
            // socket.emit('join_channel', 'EXCHANGE_DATA:ORDER_UPDATE:' + symbol);
            // socket.emit('join_channel', 'EXCHANGE_DATA:ORDERBOOK_UPDATE:' + symbol);
            // socket.emit('join_channel', 'EXCHANGE_DATA:KLINE_UPDATE:' + symbol)
        });
    
        socket.on('disconnect', () => {
            console.log('disconnect from server');
        });
    });
}

render(
    <Provider store={store}>
        <BrowserRouter>
            <AppEntry />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);