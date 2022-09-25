import { useMutation, useQuery } from 'react-query';

import { queryClient } from 'Components/AppEntry';
import Request from './requests';

import { IFormData } from 'Routes/Authed/Settings/ExchangeAccounts/ExchangeAccountForm';
import { IExchangeAccount } from 'Routes/Authed/Settings/ExchangeAccounts';

const API_URL = process.env.API_URL;

export const getExchangeAccounts = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/exchange-accounts`
});

const createExchangeAccount = (data: IFormData) => Request({
    method: 'POST',
    url: `${API_URL}/trading/exchange-accounts`,
    data: data
});

const deleteExchangeAccount = (id: number) => Request({
    method: 'DELETE',
    url: `${API_URL}/trading/exchange-accounts/${id}`,
});

export const useGetExchangeAccounts = (setAccounts: any) => {
    return useQuery([ 'exchange-accounts' ], getExchangeAccounts, {
        onSuccess: (data) => {
            const temp = data.data.map((d: IExchangeAccount) => {
                return {
                    api_key: d.api_key,
                    name: d.exchange.name,
                    id: d.id,
                    user_id: d.user_id,
                    wallet_private_key: d.wallet_private_key
                };
            });

            setAccounts(temp);
        }
    });
};

export const useCreateExchangeAccount = () => useMutation(createExchangeAccount);

export const useDeleteExchangeAccount = () => useMutation(deleteExchangeAccount, {
    onSuccess: () => {
        queryClient.invalidateQueries([ 'exchange-accounts' ]);
    }
});