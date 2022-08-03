import Request from './requests';

import { IFormData } from 'Routes/Authed/User/API/APIKey';

const API_URL = process.env.API_URL;

export const getAPIKeys = () => Request({
    method: 'GET',
    url: `${API_URL}/api-keys`
});

export const createAPIKey = (data: IFormData) => Request({
    method: 'POST',
    url: `${API_URL}/api-keys`,
    data: data
});

export const deleteAPIKey = (id: number) => Request({
    method: 'DELETE',
    url: `${API_URL}/api-keys/${id}`,
});