import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { User } from "@common/types";
import { authSliceState } from "./types";

const initialState: authSliceState = {
    user: null,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setCredentials(state, action: PayloadAction<any>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logOut(state) {
            state.user = null;
            state.token = null;
        }
    }
});

const { actions, reducer } = authSlice;

export default reducer;

export const {
    setUser,
    setToken,
    setCredentials,
    logOut
} = actions;