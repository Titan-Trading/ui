import { IField } from "Components/Forms";

export interface IBot {
    name?: string;
    algorithm_text?: string;
    parameter_options?: string;
    parameters?: IField[];
}