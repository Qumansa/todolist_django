import { User } from "@types";

export type SignUpResponse = string;
export type LogOutResponse = null;

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

export interface ChangePasswordResponse {
    message: string;
}

export interface ChangeImageResponse {
    username: User["username"];
    img: string;
}