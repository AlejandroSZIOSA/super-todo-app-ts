import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Todo } from "../../types/shared";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};
// initialState: [] as Array<Todo | null>, //Using Assertions for put correct type to the initial state

export const todoListSlice = createSlice({
  name: "todo-list",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    /*     removeTodo: (state: Array<Todo | null>, action: PayloadAction<number>) => {
      const todoId: number = action.payload;
      //problem Fixed!
      return (state = state.filter((item) => item && item.id !== todoId)); //fix problem using literals
    }, */

    updateTodo: (state, action: PayloadAction<Todo>) => {
      const updatedItem = action.payload;
      const index = state.todos.findIndex(
        (item: Todo) => item.id === updatedItem.id //fix problem using literals
      );
      if (index !== -1) {
        state.todos[index] = updatedItem;
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
