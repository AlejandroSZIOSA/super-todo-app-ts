import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "../../types/shared";

interface ThemeState {
  current: Theme;
}

const initialState: ThemeState = {
  current: "default",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.current = action.payload;
      /* saveTheme(state.current); */
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
