import { User } from "@types";

export interface authSliceState {
    // user: User | null;
    // создать общий тип для токена
    token: string | null;
}