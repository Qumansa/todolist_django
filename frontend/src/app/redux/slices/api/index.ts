import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { removeToken, setToken } from '../auth';

import { ChangePasswordData, ChangePasswordResponse, CreateToDoItemResponse, DeleteToDoItemResponse, IToDoItem, LogInData, LogInResponse, LogOutResponse, SignUpResponse, UpdateToDoItemResponse, User } from '@types';
import type { RootState } from '../..';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://127.0.0.1:8000/api/',
	// baseUrl: 'api/',
	credentials: 'include', // при любом запросе к апи, если у нас уже есть http-only cookie, в которых хранится refresh-token, то отправляем его на сервер,
	prepareHeaders(headers, { getState }) { // при любом запросе к апи отправляем токен (скорее всего access-токен), если он есть
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
					api.dispatch(removeToken());
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
		// поменять типизацию
		signUp: builder.mutation<SignUpResponse, FormData>({
			query: (data) => ({
				url: '/auth/register/',
				method: 'POST',
				body: data,
			}),
		}),
		logIn: builder.mutation<LogInResponse, LogInData>({
			query: (data) => ({
				url: '/auth/login/',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['User', 'Todos'],
		}),
		logOut: builder.mutation<LogOutResponse, void>({
			query: () => ({
				url: '/auth/logout/',
				method: 'POST',
			})
		}),
		getUser: builder.query<User, void>({
			query: () => ({
				url: '/auth/user/'
			}),
			providesTags: ['User'],
		}),
		changeUserPassword: builder.mutation<ChangePasswordResponse, ChangePasswordData>({
			query: (data) => ({
				url: '/auth/update-password/',
				method: 'PUT',
				body: data
			}),
		}),
		// добавить типизацию
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
		createToDoItem: builder.mutation<CreateToDoItemResponse, IToDoItem>({
			query: (data) => ({
				url: '/todos/',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Todos'],
		}),
		updateToDoItem: builder.mutation<UpdateToDoItemResponse, Partial<IToDoItem>>({
			query: (data) => ({
				url: `/todos/${data.id}/`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Todos'],
		}),
		deleteToDoItem: builder.mutation<DeleteToDoItemResponse, IToDoItem['id']>({
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

