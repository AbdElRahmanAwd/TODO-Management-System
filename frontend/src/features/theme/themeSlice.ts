import { createSlice } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectThemeMode = (state: { theme: ThemeState }) =>
  state.theme.mode;

export default themeSlice;
