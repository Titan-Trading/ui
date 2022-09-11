import React from 'react';
import { Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';

interface IAlertDanger {
    message: string;
    style?: any;
}

const AlertDanger = ({ message, style }: IAlertDanger) => {
    return (
        <Alert style={style} icon={<HiXCircle />} color="red" variant="filled">
            {message}
        </Alert>
    )
};

export default AlertDanger;