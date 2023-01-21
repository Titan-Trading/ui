import Request from './requests';
import { API_URL } from '../helpers/constants';

export const getIndicators = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/indicators`
});

export const getIndicator = (id: number) => Request({
    method: 'GET',
    url: `${API_URL}/trading/indicators/${id}`
});


export const createIndicator = () => Request({
    method: 'POST',
    url: `${API_URL}/trading/indicators`
});

export const updateIndicator = (id: number, data: any) => Request({
    method: 'PUT',
    url: `${API_URL}/trading/indicators/${id}`,
    data: data
});

export const deleteIndicator = (id: number) => Request({
    method: 'DELETE',
    url: `${API_URL}/trading/indicators/${id}`,
});