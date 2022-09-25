import { useMutation, useQuery } from 'react-query';

import { queryClient } from 'Components/AppEntry';
import Request from './requests';
import { IFormData } from 'Routes/Authed/Settings/Api/ApiKeyForm';

const API_URL = process.env.API_URL;

const getApiKeys = () => Request({
    method: 'GET',
    url: `${API_URL}/api-keys`
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

export const useCreateApiKey = () => useMutation(createApiKey);

export const useDeleteApiKey = () => useMutation(deleteApiKey, {
    onSuccess: () => {
        queryClient.invalidateQueries([ 'api-keys' ]);
    }
});