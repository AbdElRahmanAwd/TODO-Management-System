import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { todosApi } from "../api/todosApi";
import themeSlice from "../features/theme/themeSlice";
import guestTodosSlice from "../features/guest/guestTodosSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    guestTodos: guestTodosSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
