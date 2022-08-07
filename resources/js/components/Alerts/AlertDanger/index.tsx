import React from 'react';
import { Alert } from '@mantine/core';
import { HiXCircle } from 'react-icons/hi';

interface IAlertDanger {
    message: string;
    styles?: any;
}

const AlertDanger = ({ message, styles }: IAlertDanger) => {
    return (
        <Alert style={styles} icon={<HiXCircle />} color="red">
            {message}
        </Alert>
    )
};

export default AlertDanger;