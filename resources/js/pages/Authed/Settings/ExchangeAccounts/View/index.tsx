import React, { useEffect } from 'react';
import { useNotifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import paths from 'Paths';
import { useGetExchangeAccount } from 'API/exchangeAccounts';

const ViewExchangeAccount = () => {
    const { id } =  useParams();
    const { data, isLoading } = useGetExchangeAccount(id ? parseInt(id) : 0, id !== undefined);
    const navigate = useNavigate();
    
    return <></>
};

export default ViewExchangeAccount;