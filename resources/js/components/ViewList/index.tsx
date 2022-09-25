import React from 'react';
import { Code, List, LoadingOverlay, Text } from '@mantine/core';

import './styles.scss';

interface IViewList {
    listItems: IListItem[];
}

export interface IListItem {
    title: string;
    content: any;
    isArray?: boolean;
    isCode?: boolean;
}

const ViewList = ({ listItems }: IViewList) => {

    const renderContent = (item: IListItem) => {
        if (item.isArray) {
            if (item.content.length > 0) {
                return (
                    <List>
                        {item.content.map((c: string, i: number) => (
                            <List.Item key={i}>{c}</List.Item>
                        ))}
                    </List>
                )
            }
        } else if (item.isCode) {
            return (
                <Code className="code">{item.content}</Code>
            )
        } else {
            return item.content;
        }
    };

    
    return (
        <>
            {listItems.length > 0 && (
                <List className="list">
                    {listItems.map((l: IListItem, i: number) => (
                        <List.Item className="field" key={i}>
                            <Text weight={700}>{l.title}:</Text>
                            {renderContent(l)}
                        </List.Item>
                    ))}
                </List>
            )}
        </>
    )
};

export default ViewList;