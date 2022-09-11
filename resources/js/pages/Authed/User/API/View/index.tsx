import React, { useEffect } from 'react';
import { useNotifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import paths from 'Paths';
import { useGetApiKey } from 'API/apiKeys';

const ViewApiKey = () => {
    const params = useParams();
    const { data, isLoading } = useGetApiKey(params.id)
    const navigate = useNavigate();
    
    console.log(data);

    return <></>
};

export default ViewApiKey;