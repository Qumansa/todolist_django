export type Timer = number | null;
export type Token = string;

export interface IToDoItem {
    id: string;
    description: string;
    favourite: boolean;
}

export interface User {
    username: string;
    password: string;
    image?: File | string | null;
}

export interface File {
    name: string;
    size: number;
    type: string;
    [key: string]: any;
}

export interface InputProps {
    label: string;
    name: string;
    optional?: true;
    classNameForInput?: string;
}