import { useQuery } from 'react-query';

import Request from './requests';

const API_URL = process.env.API_URL;

const getExchanges = () => Request({
    method: 'GET',
    url: `${API_URL}/trading/exchanges`
});

export const useGetExchanges = (setExchanges: any) => useQuery([ 'exchanges' ], getExchanges, {
    onSuccess: (data) => {
        const temp = data?.data.map((d) => {
            return {
                value: { name: d.name, id: d.id },
                label: d.name
            };
        });

        setExchanges(temp);
    }
});