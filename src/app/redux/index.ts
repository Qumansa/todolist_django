import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filter";
import search from "./slices/search";

export const store = configureStore({
	reducer: {
		filter,
		search
	},
    // devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
