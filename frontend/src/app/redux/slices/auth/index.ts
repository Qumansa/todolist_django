import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { authSliceState } from "./types";

const initialState: authSliceState = {
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // создать общий тип для токена
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        logOutFromState(state) {
            state.token = null;
        }
    }
});

const { actions, reducer } = authSlice;

export default reducer;

export const {
    setToken,
    logOutFromState
} = actions;