import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import { apiSlice } from './slices/api';
import auth from "./slices/auth";
import filter from "./slices/filter";
import search from "./slices/search";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth,
		filter,
		search
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware) 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
