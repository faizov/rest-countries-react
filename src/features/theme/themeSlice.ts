import { createSlice } from "@reduxjs/toolkit";

const checkTheme = localStorage.getItem("theme") ?? "light";

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
