import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IToDoFetch } from "../interfaces/IToDoFetch";

export const todoAPI = createApi({
    reducerPath: "todoAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    tagTypes: ['ToDo'],
    endpoints: (builder) => ({
        getToDo: builder.query({
            query: () => `todos`,
            providesTags: result => ['ToDo']
        }),
        createToDo: builder.mutation({
            query: (todo: IToDoFetch) => ({
                url: `todos`,
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['ToDo']
        }),
        updateToDo: builder.mutation({
            query: (todo: IToDoFetch) => ({
                url: `todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['ToDo']
        }),
        deleteToDo: builder.mutation({
            query: (id: string) => ({
                url: `todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ToDo']
        })
    }),
})

export const { useGetToDoQuery, useCreateToDoMutation, useUpdateToDoMutation, useDeleteToDoMutation } = todoAPI