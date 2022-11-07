import { createSlice } from "@reduxjs/toolkit";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const checkTheme = localStorage.getItem("theme") || (prefersDark && "dark") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: checkTheme,
  },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("theme", state.value);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
