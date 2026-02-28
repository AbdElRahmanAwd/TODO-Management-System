import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  UpdateTodoStatusRequest,
} from "../types/todo.type";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/todos",
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    getTodo: builder.query<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<Todo, { id: number; data: UpdateTodoRequest }>(
      {
        query: ({ id, data }) => ({
          url: `/todos/${id}`,
          method: "PUT",
          data,
        }),
        invalidatesTags: ["Todos"],
      },
    ),
    updateTodoStatus: builder.mutation<
      Todo,
      { id: number; data: UpdateTodoStatusRequest }
    >({
      query: ({ id, data }) => ({
        url: `/todos/${id}/status`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation,
} = todosApi;
