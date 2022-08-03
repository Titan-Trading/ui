import Request from './requests';

const API_URL = process.env.API_URL;

export const getConnectToken = () => Request({
    method: 'POST',
    url: `${API_URL}/api-connect-tokens`
});