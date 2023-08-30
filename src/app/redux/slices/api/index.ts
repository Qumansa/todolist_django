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
		// добавить типизацию
		updateToDoItem: builder.mutation({
			query(data) {
				const { id } = data;

				return {
					url: `/todos/${id}`,
					method: 'PATCH',
					body: data,
				};
			},
			invalidatesTags: ['Todos'],
		}),
		// добавить типизацию
		deleteToDoItem: builder.mutation({
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
