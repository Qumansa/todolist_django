import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IToDoItem } from './types';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://127.0.0.1:8000/api/',
		// baseUrl: 'api/',
	}),
	tagTypes: ['Todos'],
	endpoints: (builder) => ({
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

export const { useGetToDoListQuery, useDeleteToDoItemMutation, useCreateToDoItemMutation, useUpdateToDoItemMutation } =
	apiSlice;
	
