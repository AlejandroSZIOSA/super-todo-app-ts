import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Language } from "../../types/shared";

import {
  loadLanguage,
  saveLanguage,
} from "../../utils/localstorage/localstorage";

interface LanguageState {
  current: Language;
}

const initialState: LanguageState = {
  current: loadLanguage(),
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.current = action.payload;
      saveLanguage(state.current);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
