import Request from './requests';

const API_URL = process.env.API_URL;

export const getExchanges = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/exchanges`
});