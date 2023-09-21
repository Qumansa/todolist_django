import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { logOut, setCredentials } from '../auth';

import type { RootState } from '../..';
import { IToDoItem, IUser } from './types';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://127.0.0.1:8000/api/',
	// baseUrl: 'api/',
	credentials: 'include', // при любом запросе к апи, если у нас уже есть http-only cookie, в которых хранится refresh-token, то отправляем его на сервер,
	prepareHeaders(headers, {getState}) { // при любом запросе к апи отправляем токен (скорее всего access-токен), если он есть
		const token = (getState() as RootState).auth.token;
		
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	}
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	// ниже обрабатываются ошибки после запроса
	// 401 - неавторизован
	// 403 - невалидный access-токен
	if (result.error?.status === (401 || 403)) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				// попытка получения нового access-токена путем отправки refresh-токена
				const refreshResult = await baseQuery(
					{
						url: '/token/refresh/', 
						method: 'POST'
					}, 
					api, 
					extraOptions
				);
				console.log(refreshResult);
		
				if (refreshResult?.data) {
					// сохранение нового access-токена
					// возможно, ниже можно передать метод setCredentials на методы setUser и setToken
					const user = (api.getState() as RootState).auth.user;
					api.dispatch(setCredentials({
						user,
						token: refreshResult.data, 
					}));
					// повтор первоначального запроса
					result = await baseQuery(args, api, extraOptions)
				} else {
					api.dispatch(logOut());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
      		result = await baseQuery(args, api, extraOptions);
		}
	} 

	return result;
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Todos'],
	endpoints: (builder) => ({
		signUp: builder.mutation({
            query: (userData) => ({
                url: '/auth/signup/',
                method: 'POST',
                body: userData,
            }),
        }),
		logIn: builder.mutation({
            query: (credentials) => ({
                url: '/token/',
                method: 'POST',
                body: credentials
            }),
        }),
		getToDoList: builder.query<IToDoItem[], void>({
			query: () => '/todos/',
			providesTags: ['Todos'],
		}),
		createToDoItem: builder.mutation<IToDoItem, IToDoItem>({
			query: (toDoItem) => ({
				url: '/todos/',
				method: 'POST',
				body: toDoItem,
			}),
			invalidatesTags: ['Todos'],
		}),
		updateToDoItem: builder.mutation<IToDoItem, Partial<IToDoItem>>({
			query: (data) => ({
				url: `/todos/${data.id}/`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Todos'],
		}),
		deleteToDoItem: builder.mutation<IToDoItem, string>({
			query: (id) => ({
				url: `/todos/${id}/`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Todos'],
		}),
	}),
});

export const { useSignUpMutation, useLogInMutation, useGetToDoListQuery, useDeleteToDoItemMutation, useCreateToDoItemMutation, useUpdateToDoItemMutation } =
	apiSlice;
	
