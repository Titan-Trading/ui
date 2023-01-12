import React from 'react';
import { render } from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import rootReducer from './redux';
import { showLoading, hideLoading, setError } from './redux/layout';
import WebSocketProvider from './components/WebSocketContext';
import AppEntry from './components/AppEntry';

import '../scss/app.scss';

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

render(
    <Provider store={store}>
        <WebSocketProvider>
            <Router>
                <AppEntry />
            </Router>
        </WebSocketProvider>
    </Provider>,
    document.getElementById('root')
);