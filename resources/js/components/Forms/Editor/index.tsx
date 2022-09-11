import React from 'react';
import { useController } from 'react-hook-form';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Input } from '@mantine/core';

import { IFormRequirements } from '../index';

import './style.scss';

const Editor = ({ name, label, control, required, rules, error }: IFormRequirements) => {
    const { field } = useController({ control, name, rules });
    
    return (
        <Input.Wrapper
            required={required}
            label={label}
            error={error}
            sx={(theme) => ({
                marginBottom: theme.spacing.lg
            })}
        >
            <CodeEditor
                className="editor"
                language="js"
                padding={15}
                style={{
                    fontSize: 12,
                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
                }}
                {...field}
            />
        </Input.Wrapper>
    )
};

export default Editor;