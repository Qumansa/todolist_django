import { User } from "@types";

export type LogInData = Pick<User, 'username' | 'password'>;

export interface Token {
    access_token: string;
}