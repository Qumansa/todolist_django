import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import { filterSliceState } from "./types";

const filterAdapter = createEntityAdapter();

const initialState: filterSliceState = filterAdapter.getInitialState({
    filters: [
        {
            id: uuidv4(),
            name: 'All'
        },
        {
            id: uuidv4(),
            name: 'Favourite'
        },
        {
            id: uuidv4(),
            name: 'A...z'
        },
        {
            id: uuidv4(),
            name: 'Z...a'
        },
    ],
    activeFilter: 'All'
});

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChanged(state, action: PayloadAction<string>) {
            state.activeFilter = action.payload;
        }
    }
});

const { actions, reducer } = filterSlice;

export default reducer;

export const {
    filterChanged,
} = actions;