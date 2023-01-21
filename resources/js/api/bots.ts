import Request from './requests';
import { IBot } from '../models/Bot';
import { API_URL } from '../helpers/constants';

export const getBots = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/bots`
});

export const getBot = (id: number) => Request({
    method: 'GET',
    url: `${API_URL}/trading/bots/${id}`
});

export const createBot = () => Request({
    method: 'POST',
    url: `${API_URL}/trading/bots`
});

export const updateBot = (id: number, data: IBot) => Request({
    method: 'PUT',
    url: `${API_URL}/trading/bots/${id}`,
    data: data
});

export const deleteBot = (id: number) => Request({
    method: 'DELETE',
    url: `${API_URL}/trading/bots/${id}`,
});