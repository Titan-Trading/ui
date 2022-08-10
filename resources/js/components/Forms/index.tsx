import AddableList from './AddableList';
import Editor from './Editor';
import Input from './Input';
import Select from './Select';

export interface IFormRequirements {
    name: string;
    label: string;
    control: any;
    rules?: any;
    required?: boolean;
    error: any;
}
export interface IOption {
    label: string;
    value: string;
}

export interface IField {
    id: string;
    value: string;
}

export { AddableList, Editor, Input, Select };