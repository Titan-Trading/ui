import { useMutation, useQuery } from 'react-query';

import Request from './requests';
import { queryClient } from 'Components/AppEntry';
import { IFormData } from 'Routes/Authed/Laboratory/Bots/BotForm';

interface IUpdate {
    id: number;
    data: IFormData;
}

export const getBots = () => Request({
    method: 'GET',
    url: '/trading/bots'
});

export const getBot = (id: number) => Request({
    method: 'GET',
    url: `/trading/bots/${id}`
});

const createBot = (data: IFormData) => Request({
    method: 'POST',
    url: '/trading/bots',
    data: data
});

const updateBot = ({ id, data }: IUpdate) => Request({
    method: 'PUT',
    url: `/trading/bots/${id}`,
    data: data
});

export const deleteBot = (id: number) => Request({
    method: 'DELETE',
    url: `/trading/bots/${id}`,
});

// hooks

export const useGetBots = () => useQuery([ 'bots' ], getBots);

export const useGetBot = (id: number) => useQuery([ `bot-${id}` ], () => getBot(id));

export const useCreateBot = () => useMutation(createBot, {
    onSuccess: () => {
        queryClient.invalidateQueries([ 'bots' ]);
    }
});

export const useUpdateBot = () => {
    return useMutation(updateBot, {
        onSuccess: (data) => {
            queryClient.invalidateQueries([ 'bots', `bot-${data.data.id}` ]);
        }
    });
};

export const useDeleteBot = () => useMutation(deleteBot, {
    onSuccess: () => {
        queryClient.invalidateQueries([ 'bots' ]);
    }
});