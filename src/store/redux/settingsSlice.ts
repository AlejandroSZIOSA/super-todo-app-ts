import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DaysCountdown, Theme, Language } from "../../types/shared";

import { loadSettings } from "../../utils/localstorage/localstorage";

type Setting = {
  language: Language;
  theme: Theme;
  daysCountdown: DaysCountdown;
};
// Load initial settings from localStorage, if available, otherwise use defaults
const initialState: Setting = loadSettings();

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(_state, action: PayloadAction<Setting>) {
      return action.payload; // full replacement, pure reducer
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
