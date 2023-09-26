import { User } from "../../types";

export type LogInData = Pick<User, 'username' | 'password'>;

export interface Tokens {
    access: string;
    refresh: string;
}