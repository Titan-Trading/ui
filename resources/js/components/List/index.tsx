import React from 'react';
import { Button, Card, Loader, Text, Group, Center } from '@mantine/core';
import { isEmpty } from 'ramda';
import { openConfirmModal } from '@mantine/modals';

import './styles.scss';

interface IList {
    loading: boolean;
    items: any[];
    onEdit?: any;
    onView?: any;
    onDelete?: any;
    emptyMessage: any;
}

const List = ({
    loading,
    items,
    onEdit, 
    onView,
    onDelete,
    emptyMessage
}: IList) => {

    const handleDelete = (id: number) => {
        openConfirmModal({
            title: 'Are you sure you want to delete this item?',
            closeOnConfirm: true,
            labels: { confirm: 'I\'m Sure', cancel: 'Nevermind' },
            children: <Text size="sm">This action cannot be undone</Text>,
            cancelProps: { color: 'cyan', variant: 'subtle' },
            confirmProps: { color: 'red' },
            onConfirm: () => onDelete(id)
        })
    };

    return (
        <div style={{ position: 'relative' }}>
            {loading ? (
                <Center>
                    <Loader variant="bars" color="cyan" />
                </Center>
            ) : (
                <Card style={{ padding: '22px 16px' }}>
                    {isEmpty(items) && !loading ? (
                        <Text>{emptyMessage}</Text>
                    ) : (
                        items && items.length > 0 && (
                            <ul className="key-list">
                                {items.map((i) => {
                                    return (
                                        <li key={i.id}>
                                            <Text className="name">{i.name}</Text>
                                            <Group>
                                                {onView && (
                                                    <Button variant="light" color="cyan" onClick={() => onView(i.id)}>
                                                        View
                                                    </Button>
                                                )}
                                                {onEdit && (
                                                    <Button variant="light" color="lime" onClick={() => onEdit(i.id)}>
                                                        Edit
                                                    </Button>
                                                )}
                                                {onDelete && (
                                                    <Button variant="light" color="red" onClick={() => handleDelete(i.id)}>
                                                        Delete
                                                    </Button>
                                                )}
                                            </Group>
                                        </li>
                                    );
                                })}
                            </ul>
                        )
                    )}
                </Card> 
            )}
        </div>
    )
};

export default List;