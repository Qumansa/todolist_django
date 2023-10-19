import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SearchValue } from "@types";
import { searchSliceState } from "./types";

const initialState: searchSliceState = {
    searchValue: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchChanged(state, action: PayloadAction<SearchValue>) {
            state.searchValue = action.payload;
        }
    }
});

const {actions, reducer} = searchSlice;

export default reducer;

export const {
    searchChanged,
} = actions;