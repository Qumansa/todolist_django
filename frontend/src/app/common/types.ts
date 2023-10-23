import { FormikErrors } from "formik";

export type Timer = number | null;
export type Token = string;
export type SearchValue = string;
export type SignUpResponse = string;
export type LogInData = Pick<User, 'username' | 'password'>;
export type LogOutResponse = null;

export interface IToDoItem {
    id: string;
    description: string;
    favourite: boolean;
}

export interface User {
    username: string;
    password: string;
    img?: File;
}

export interface InputProps {
    name: string;
    label?: string;
    optional?: true;
    classNameForInput?: string;
}

export interface LogInResponse {
    access_token: Token;
}

export interface CreateToDoItemResponse {
    data: {
        id: number;
        description: string;
        favourite: boolean;
    };
}

export interface UpdateToDoItemResponse {
    data: {
        id: number;
        description: string;
        favourite: boolean;
    };
}

export interface DeleteToDoItemResponse {
    data: null;
}

export interface ChangePasswordData {
    old_password: User["password"];
    new_password: User["password"];
};

export interface ChangePasswordResponse {
    message: string;
}
