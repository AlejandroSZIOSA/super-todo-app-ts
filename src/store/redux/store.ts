import { configureStore } from "@reduxjs/toolkit";
import todosReducers from "./reducers";

const store = configureStore({
  reducer: {
    todos: todosReducers,
  },
});

/* export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; */

export default store;
