import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DaysCountdown, Theme, Language } from "../../types/shared";

import { loadSettings } from "../../utils/localstorage/localstorage";

type Setting = {
  language: Language;
  theme: Theme;
  daysCountdown: DaysCountdown;
};

const initialState: Setting = loadSettings();

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<Setting>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
