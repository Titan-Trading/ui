import React, { useEffect } from 'react';
import { useNotifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import paths from 'Paths';
import { useGetApiKey } from 'API/apiKeys';

const ViewApiKey = () => {
    const { id } =  useParams();
    const { data, isLoading } = useGetApiKey(id ? parseInt(id) : 0, id !== undefined);
    const navigate = useNavigate();
    
    return <></>
};

export default ViewApiKey;