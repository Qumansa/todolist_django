import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Token } from "@common/types";
import { authSliceState } from "./types";

const initialState: authSliceState = {
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<Token>) {
            state.token = action.payload;
        },
        removeToken(state) {
            state.token = null;
        }
    }
});

const { actions, reducer } = authSlice;

export default reducer;

export const {
    setToken,
    removeToken
} = actions;