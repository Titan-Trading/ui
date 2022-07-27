import Request from './requests';

export const getExchanges = () => Request({
    method: 'GET',
    url: '/trading/exchanges'
});