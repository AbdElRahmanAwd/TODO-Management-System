import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoStatus } from "../../types/todo.type";

export interface GuestTodo {
  id: string;
  name: string;
  description?: string;
  status: string;
}

interface GuestTodosState {
  todos: GuestTodo[];
}

const initialState: GuestTodosState = {
  todos: [],
};

const guestTodosSlice = createSlice({
  name: "guestTodos",
  initialState,
  reducers: {
    addGuestTodo(
      state,
      action: PayloadAction<{ name: string; description?: string }>,
    ) {
      state.todos.push({
        id: crypto.randomUUID(),
        name: action.payload.name,
        description: action.payload.description,
        status: TodoStatus.TODO,
      });
    },
    removeGuestTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    clearGuestTodos(state) {
      state.todos = [];
    },
  },
});

export const { addGuestTodo, removeGuestTodo, clearGuestTodos } =
  guestTodosSlice.actions;

export const selectGuestTodos = (state: { guestTodos: GuestTodosState }) =>
  state.guestTodos.todos;

export default guestTodosSlice;
