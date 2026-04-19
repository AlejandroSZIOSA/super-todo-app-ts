//Redux Store
import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./store/redux/settingsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

// TS types for the whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
