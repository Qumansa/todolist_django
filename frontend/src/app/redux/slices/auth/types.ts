import { User } from "@types";

export interface authSliceState {
    user: User | null;
    token: string | null;
}