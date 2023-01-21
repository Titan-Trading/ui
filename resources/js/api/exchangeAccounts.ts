import Request from './requests';
import { IFormData } from 'Routes/Authed/UserSettings/ExchangeAccounts/ExchangeAccount';
import { API_URL } from '../helpers/constants';

export const getExchangeAccounts = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/exchange-accounts`
});

export const createExchangeAccount = (data: IFormData) => Request({
    method: 'POST',
    url: `${API_URL}/trading/exchange-accounts`,
    data: data
});

export const deleteExchangeAccount = (id: number) => Request({
    method: 'DELETE',
    url: `${API_URL}/trading/exchange-accounts/${id}`,
});