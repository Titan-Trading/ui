import { useMutation, useQuery } from 'react-query';

import { queryClient } from 'Components/AppEntry';
import Request from './requests';

import { IFormData } from 'Routes/Authed/User/Api/ApiKeyForm';

interface IUpdate {
    id: number;
    data: IFormData;
}

const API_URL = process.env.API_URL;

const getApiKeys = () => Request({
    method: 'GET',
    url: `${API_URL}/api-keys`
});

const getApiKey = (id: number) => Request({
    method: 'GET',
    url: `${API_URL}/api-keys/${id}`
});

export const updateApiKey = ({ id, data }: IUpdate) => Request({
    method: 'PUT',
    url: `${API_URL}/api-keys/${id}`,
    data
});

export const createApiKey = (data: IFormData) => Request({
    method: 'POST',
    url: `${API_URL}/api-keys`,
    data
});

export const deleteApiKey = (id: number) => Request({
    method: 'DELETE',
    url: `${API_URL}/api-keys/${id}`,
});

export const useGetApiKeys = () => useQuery([ 'api-keys' ], getApiKeys);
export const useGetApiKey = (id: number) => {
    return useQuery([ `api-key-${id}`, id ], () => getApiKey(id))
};
export const useUpdateApiKey = () => {
    return useMutation(updateApiKey, {
        onSuccess: () => {
            queryClient.invalidateQueries([ 'api-keys' ]);
        }
    })
};
export const useCreateApiKey = () => useMutation(createApiKey);