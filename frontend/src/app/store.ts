import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { todosApi } from "../api/todosApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, todosApi.middleware),
});
