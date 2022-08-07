import Request from './requests';
import { IFormData } from 'Routes/Authed/User/ConnectedExchanges/ConnectedExchange';

const API_URL = process.env.API_URL;

export const getConnectedExchanges = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/exchange_accounts`
});

export const createConnectedExchange = (data: IFormData) => Request({
    method: 'POST',
    url: `${API_URL}/trading/exchange_accounts`,
    data: data
});

export const deleteConnectedExchange = (id: number) => Request({
    method: 'DELETE',
    url: `${API_URL}/trading/exchange_accounts/${id}`,
});