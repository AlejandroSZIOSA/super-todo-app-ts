import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Todo } from "../../types/shared";
import { loadTodos, saveTodos } from "../../utils/localstorage/localstorage";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: loadTodos(),
};
// initialState: [] as Array<Todo | null>, //Using Assertions for put correct type to the initial state

export const todoListSlice = createSlice({
  name: "todo-list",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      saveTodos(state.todos);
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      const todoId: number = action.payload;
      state.todos = state.todos.filter((item: Todo) => item.id !== todoId);
      saveTodos(state.todos);
    },

    updateTodo: (state, action: PayloadAction<Todo>) => {
      const updatedItem = action.payload;
      const index = state.todos.findIndex(
        (item: Todo) => item.id === updatedItem.id //fix problem using literals
      );
      if (index !== -1) {
        state.todos[index] = updatedItem;
        saveTodos(state.todos);
      }
    },

    /*   resetTodoList: (state) => {
      return [];
    },
    setInitialList: (state, action) => {
      return [...action.payload];
    }, */
  },
});

export const {
  addTodo,
  // removeTodo,
  updateTodo,
  /* resetTodoList,
  setInitialList, */
} = todoListSlice.actions; //destructuring reducers

export default todoListSlice.reducer;
