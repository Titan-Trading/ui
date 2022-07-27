import Request from './requests';

import { IFormData } from 'Routes/Authed/User/API/APIKey';

export const getAPIKeys = () => Request({
    method: 'GET',
    url: '/api-keys'
});

export const createAPIKey = (data: IFormData) => Request({
    method: 'POST',
    url: '/api-keys',
    data: data
});

export const deleteAPIKey = (id: number) => Request({
    method: 'DELETE',
    url: `/api-keys/${id}`,
});