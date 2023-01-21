import axios from 'axios';
import { isEmpty } from 'ramda';
import { API_URL } from '../helpers/constants';

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if(error) prom.reject(error);
        else prom.resolve(token);
    });

    failedQueue = [];
};

const Request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// request interceptor
Request.interceptors.request.use(
    (config) => {
        const userJwt = localStorage.getItem('user');
        const user = userJwt ? JSON.parse(userJwt) : null;
        
        if (user && config.headers) {
            config.headers['X-Auth-Token'] = user.access_token;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// response interceptor
Request.interceptors.response.use(
    // success
    (res) => res,

    // failure
    async (err) => {
        // if no response was received, reject the promise
        if (!err.response) return Promise.reject(err);

        const originalRequest = err.config;
        const { status } = err.response;

        // if the token has expired, try to refresh it
        if(status === 401 && !originalRequest._retry) {
            console.log('unauthorized');

            // if the token is already being refreshed, add the failed request to the queue and replay the request or reject the promise
            if(isRefreshing) {
                return new Promise((resolve, reject) => {
                    console.log('pushing to queue');
                    failedQueue.push({resolve, reject});
                }).then(token => {
                    console.log('replaying request');
                    originalRequest.headers['X-Auth-Token'] = 'Bearer ' + token;
                    return Request(originalRequest);
                }).catch(err => {
                    console.log('rejecting request');
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(async (resolve, reject) => {
                const userJwt = localStorage.getItem('user');
                const user = userJwt ? JSON.parse(userJwt) : null;

                // if the user is not logged in, reject the promise
                if (!user) {
                    console.log('no user');
                    return;
                }

                console.log('user data: ' + userJwt);
                console.log('user: ', user);
                
                // refresh the token
                console.log('refreshing token...');
                Request({
                    method: 'POST',
                    url: `${API_URL}/auth/refresh`,
                    headers: {
                        'X-Auth-Token': user.access_token
                    },
                    data: {
                        refresh_token: user.refresh_token
                    }
                }).then(({data}) => {
                    console.log('token refreshed');
                    console.log(data);

                    axios.defaults.headers['X-Auth-Token'] = 'Bearer ' + data.access_token;
                    originalRequest.headers['X-Auth-Token'] = 'Bearer ' + data.access_token;

                    data.user = user.user;
                    localStorage.setItem('user', JSON.stringify(data));

                    processQueue(null, data.access_token);

                    resolve(Request(originalRequest));
                }).catch(err => {
                    console.log('token refresh failed', err);
                    // token expired or has been revoked so it cannot be refreshed
                    localStorage.removeItem('user');

                    processQueue(err, null);

                    reject(err);
                }).finally(() => {
                    isRefreshing = false;
                });
            });
        }

        /*if (status) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            if (isEmpty(user)) return;

            if (status === 401) {

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const response = await Request({
                            method: 'POST',
                            url: '/auth/refresh',
                            headers: {
                                'X-Auth-Token': user.access_token,
                                'Content-Type': 'application/json'
                            },
                            data: {
                                refresh_token: user.refresh_token
                            }
                        });

                        //token was revoked, terminate session
                        if (!response) {
                            localStorage.removeItem('user');
                            return window.location.reload();
                        }
                        
                        //refresh token succeeded
                        localStorage.setItem('user', JSON.stringify(response.data));
                        isRefreshing = false;

                        //retry original request
                        return Request(originalRequest);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                }
            }
        }*/

        return Promise.reject(err);
    }
);
  
export default Request;