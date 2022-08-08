import AddableList from './AddableList';
import Input from './Input';
import Select from './Select';

export interface IOption {
    label: string;
    value: string;
}

export interface IField {
    id: string;
    value: string;
}

export { AddableList, Input, Select };