import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Theme } from "../../types/shared";

//using localstorage in initialState and after setTheme new state
import { loadTheme, saveTheme } from "../../utils/localstorage/localstorage";

interface ThemeState {
  current: Theme;
}

const initialState: ThemeState = {
  current: loadTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.current = action.payload;
      saveTheme(state.current);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
