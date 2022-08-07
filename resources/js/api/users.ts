import Request from './requests';

const API_URL = process.env.API_URL;

import { ILoginFormData } from 'Routes/Guest/Login';

export const login = (data: ILoginFormData) => Request({
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: data
});

export const getUser = (id: number) => Request({
    method: 'GET',
    url: `${API_URL}/users/${id}`
});