import React from 'react';
import { Button, Card, LoadingOverlay, Text, Group } from '@mantine/core';
import { isEmpty } from 'ramda';

import './styles.scss';

interface IList {
    loading: boolean;
    items: any[];
    onEdit: any;
    onView: any;
    emptyMessage: any;
}

const List = ({
    loading,
    items,
    onEdit, 
    onView,
    emptyMessage
}: IList) => {
    return (
        <Card style={{ padding: '22px 16px' }}>
            <LoadingOverlay visible={loading} />
            {isEmpty(items) && !loading ? (
                <Text>{emptyMessage}</Text>
            ) : (
                <ul className="key-list">
                    {items.map((i) => {
                        return (
                            <li key={i.id}>
                                <Text className="name">{i.name}</Text>
                                <Group>
                                    <Button variant="light" color="green" onClick={() => onEdit(i.id)}>
                                        Edit
                                    </Button>
                                    <Button variant="light" color="cyan" onClick={() => onView(i.id)}>
                                        View
                                    </Button>
                                </Group>
                            </li>
                        );
                    })}
                </ul>
            )}
        </Card>
    )
};

export default List;