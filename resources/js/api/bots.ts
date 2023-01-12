import Request from './requests';

import { IBot } from '../models/Bot';

export const getBots = () => Request({
    method: 'GET',
    url: '/trading/bots'
});

export const getBot = (id: number) => Request({
    method: 'GET',
    url: `/trading/bots/${id}`
});


export const createBot = () => Request({
    method: 'POST',
    url: '/trading/bots'
});

export const updateBot = (id: number, data: IBot) => Request({
    method: 'PUT',
    url: `/trading/bots/${id}`,
    data: data
});

export const deleteBot = (id: number) => Request({
    method: 'DELETE',
    url: `/trading/bots/${id}`,
});