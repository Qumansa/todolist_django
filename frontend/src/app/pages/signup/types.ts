export interface File {
    name: string;
    size: number;
    type: string;
    [key: string]: any;
}

export interface ISignUpData {
    username: string;
    password: string;
    image?: any;
}