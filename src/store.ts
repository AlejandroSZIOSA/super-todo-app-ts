//Redux Store
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./store/redux/todos-reducer";
import languageReducer from "./store/redux/languageSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    language: languageReducer,
  },
});

// TS types for the whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
