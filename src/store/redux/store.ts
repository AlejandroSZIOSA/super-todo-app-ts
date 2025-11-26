import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./todos-reducer"; // Ensure this file has a default export

const store = configureStore({
  reducer: {
    todos: todosReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
