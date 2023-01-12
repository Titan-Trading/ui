import Request from './requests';


export const getIndicators = () => Request({
    method: 'GET',
    url: '/trading/indicators'
});

export const getIndicator = (id: number) => Request({
    method: 'GET',
    url: `/trading/indicators/${id}`
});


export const createIndicator = () => Request({
    method: 'POST',
    url: '/trading/indicators'
});

export const updateIndicator = (id: number, data: any) => Request({
    method: 'PUT',
    url: `/trading/indicators/${id}`,
    data: data
});

export const deleteIndicator = (id: number) => Request({
    method: 'DELETE',
    url: `/trading/indicators/${id}`,
});