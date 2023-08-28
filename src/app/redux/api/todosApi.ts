import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
	reducerPath: 'todosApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/',
	}),
	tagTypes: ['Todos'],
	endpoints: (builder) => ({
		getToDoList: builder.query({
			query: () => '/todos',
			providesTags: ['Todos'],
		}),
		createToDoItem: builder.mutation({
			query: (toDoItem) => ({
				url: '/todos',
				method: 'POST',
				body: toDoItem,
			}),
			invalidatesTags: ['Todos'],
		}),
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
	todosApi;
