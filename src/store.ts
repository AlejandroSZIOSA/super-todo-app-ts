//Redux Store
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./store/redux/todos-reducer";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// TS types for the whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
