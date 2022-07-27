import React from 'react';
import { Button, Card, Group, LoadingOverlay, Text } from '@mantine/core';
import { isEmpty } from 'ramda';

import './styles.scss';

interface IList {
    loading: boolean;
    items: any[];
    onView: any;
    onDelete: any;
    emptyMessage: any;
}

const List = ({
    loading,
    items,
    onView,
    onDelete,
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
                                    <Button onClick={() => onView(i)}>View</Button>
                                    <Button onClick={() => onDelete(i)} color="red">Delete</Button>
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