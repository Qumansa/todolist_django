import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IToDoItem } from './types';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/',
	}),
	tagTypes: ['Todos'],
	endpoints: (builder) => ({
		getToDoList: builder.query<IToDoItem[], void>({
			query: () => '/todos',
			providesTags: ['Todos'],
		}),
		createToDoItem: builder.mutation<IToDoItem, IToDoItem>({
			query: (toDoItem) => ({
				url: '/todos',
				method: 'POST',
				body: toDoItem,
			}),
			invalidatesTags: ['Todos'],
		}),
		updateToDoItem: builder.mutation<IToDoItem, Partial<IToDoItem>>({
			query: (data) => ({
				url: `/todos/${data.id}`,
				method: 'PATCH111',
				body: data,
			}),
			invalidatesTags: ['Todos'],
		}),
		deleteToDoItem: builder.mutation<IToDoItem, string>({
			query: (id) => ({
				url: `/todos/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Todos'],
		}),
	}),
});

export const { useGetToDoListQuery, useDeleteToDoItemMutation, useCreateToDoItemMutation, useUpdateToDoItemMutation } =
	apiSlice;
