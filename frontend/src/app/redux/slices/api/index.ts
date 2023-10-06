import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { logOutFromState, setToken } from '../auth';

import { IToDoItem, User } from '@types';
import type { RootState } from '../..';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://127.0.0.1:8000/api/',
	// baseUrl: 'api/',
	credentials: 'include', // при любом запросе к апи, если у нас уже есть http-only cookie, в которых хранится refresh-token, то отправляем его на сервер,
	prepareHeaders(headers, {getState}) { // при любом запросе к апи отправляем токен (скорее всего access-токен), если он есть
		const token = (getState() as RootState).auth.token;
		
		token && headers.set("authorization", `Bearer ${token}`); 

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
						url: '/auth/refresh-token/', 
						method: 'POST'
					}, 
					api, 
					extraOptions
				);
		
				if (refreshResult?.data 
					&& typeof refreshResult.data === 'object' 
					&& 'access' in refreshResult.data 
					&& typeof refreshResult.data.access === 'string') {
					api.dispatch(setToken(refreshResult.data.access));
					// повтор первоначального запроса
					result = await baseQuery(args, api, extraOptions)
				} else {
					api.dispatch(logOutFromState());
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
	tagTypes: ['User', 'Todos'],
	endpoints: (builder) => ({
		// <ReturnValueHere, ArgumentTypeHere> If there is no argument, use void
		// переписать все типы
		signUp: builder.mutation({
            query: (data) => ({
                url: '/auth/register/',
                method: 'POST',
                body: data,
            }),
        }),
		logIn: builder.mutation({
            query: (data) => ({
                url: '/auth/login/',
                method: 'POST',
                body: data
            }),
			invalidatesTags: ['User', 'Todos'],
        }),
		logOut: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout/',
                method: 'POST',
            }),
			invalidatesTags: ['User', 'Todos'],
        }),
		getUser: builder.query<User, void>({
			query: () => '/auth/user/',
			providesTags: ['User'],
		}),
		changeUserPassword: builder.mutation({
            query: (data) => ({
                url: '/changepassword/',
                method: 'POST',
                body: data
            }),
        }),
		changeUserImage: builder.mutation({
            query: (data) => ({
                url: '/changeimage/',
                method: 'POST',
                body: data
            }),
        }),
		getToDoList: builder.query<IToDoItem[], void>({
			query: () => '/todos/',
			providesTags: ['Todos'],
		}),
		createToDoItem: builder.mutation<IToDoItem, IToDoItem>({
			query: (data) => ({
				url: '/todos/',
				method: 'POST',
				body: data,
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

export const { useSignUpMutation, useLogInMutation, useGetUserQuery, useLogOutMutation, useChangeUserPasswordMutation, useChangeUserImageMutation, useGetToDoListQuery, useDeleteToDoItemMutation, useCreateToDoItemMutation, useUpdateToDoItemMutation } =
	apiSlice;
	
