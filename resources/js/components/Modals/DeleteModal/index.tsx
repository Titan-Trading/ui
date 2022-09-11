import React from 'react';
import { Modal, Text, Title, Button, Group } from '@mantine/core';

interface IDeleteModal {
    open: boolean;
    setOpen: any;
    title: string;
    message: any;
}

const DeleteModal = ({ open, setOpen, title, message }: IDeleteModal) => {
    return (
        <Modal opened={open} onClose={() => setOpen(false)}>
            <Title order={2}>{title}</Title>
            <Text>{message}</Text>
        </Modal>
    )
};

export default DeleteModal;