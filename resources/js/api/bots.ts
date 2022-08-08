import Request from './requests';

import { IFormData } from 'Routes/Authed/Laboratory/Bots/Bot';

export const getBots = () => Request({
    method: 'GET',
    url: '/trading/bots'
});

export const getBot = (id: number) => Request({
    method: 'GET',
    url: `/trading/bots/${id}`
});


export const createBot = (data: IFormData) => Request({
    method: 'POST',
    url: '/trading/bots',
    data: data
});

export const updateBot = (id: number, data: IFormData) => Request({
    method: 'PUT',
    url: `/trading/bots/${id}`,
    data: data
});

export const deleteBot = (id: number) => Request({
    method: 'DELETE',
    url: `/trading/bots/${id}`,
});