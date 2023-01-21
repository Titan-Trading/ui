import Request from './requests';
import { API_URL } from '../helpers/constants';

export const getExchanges = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/exchanges`
});

export const getExchangeSymbols = (exchangeId: number) => Request({
    method: 'GET',
    url: `${API_URL}/trading/exchanges/${exchangeId}/symbols`
});