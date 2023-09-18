export interface IToDoItem {
    id: string;
    description: string; 
    favourite: boolean;
}

export interface IUser {
    name: string;
    password: string; 
    confirmPassword: string; 
    image?: any; 
}