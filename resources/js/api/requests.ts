import axios from 'axios';
import { isEmpty } from 'ramda';

let isRefreshing = false;

console.log(process.env.API_URL);

const Request = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

Request.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && config.headers) config.headers['X-Auth-Token'] = user.access_token;

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

Request.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (!err.response) return Promise.reject(err);

        const originalRequest = err.config;
        const { status } = err.response;

        if (status) {
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
        }

        return Promise.reject(err);
    }
);
  
export default Request;