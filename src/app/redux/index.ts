import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import filter from "./slices/filter";

export const store = configureStore({
	reducer: {
		filter,
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
