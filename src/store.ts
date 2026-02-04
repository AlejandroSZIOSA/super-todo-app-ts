//Redux Store
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./store/redux/todosSlice";
import languageReducer from "./store/redux/languageSlice";
import themeReducer from "./store/redux/themeSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    language: languageReducer,
    theme: themeReducer,
  },
});

// TS types for the whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
