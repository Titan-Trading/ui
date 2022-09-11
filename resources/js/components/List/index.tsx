import React from 'react';
import { Button, Card, LoadingOverlay, Text } from '@mantine/core';
import { isEmpty } from 'ramda';

import './styles.scss';

interface IList {
    loading: boolean;
    items: any[];
    onView: any;
    emptyMessage: any;
}

const List = ({
    loading,
    items,
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
                                <Button onClick={() => onView(i.id)}>View</Button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </Card>
    )
};

export default List;