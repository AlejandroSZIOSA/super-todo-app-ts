//Redux Store
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./store/redux/todosSlice";
import settingsReducer from "./store/redux/settingsSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    settings: settingsReducer,
  },
});

// TS types for the whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
