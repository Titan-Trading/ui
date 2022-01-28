import Request from './requests';

const API_URL = process.env.API_URL;

export const getAllAPIKeys = () => Request({
    method: 'GET',
    url: `${API_URL}/api-keys`
});

export const createAPIKey = (data) => Request({
    method: 'POST',
    url: `${API_URL}/api-keys`,
    data: data
});

export const deleteAPIKey = (id) => Request({
    method: 'DELETE',
    url: `${API_URL}/api-keys/${id}`,
});