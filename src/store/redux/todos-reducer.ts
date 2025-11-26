import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Todo } from "../../types/shared";

export const todoListSlice = createSlice({
  name: "list",
  initialState: [] as Array<Todo | null>, //Using Assertions for put correct type to the initial state

  reducers: {
    addTodo: (state: Array<Todo | null>, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },

    removeTodo: (state: Array<Todo | null>, action: PayloadAction<number>) => {
      const todoId: number = action.payload;
      //problem Fixed!
      return (state = state.filter((item) => item && item.id !== todoId)); //fix problem using literals
    },

    updateTodo: (state: Array<Todo | null>, action: PayloadAction<Todo>) => {
      const updatedItem = action.payload;
      const index = state.findIndex(
        (item) => item && item.id === updatedItem.id //fix problem using literals
      );
      if (index !== -1) {
        state[index] = updatedItem;
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
  removeTodo,
  updateTodo,
  /* resetTodoList,
  setInitialList, */
} = todoListSlice.actions; //destructuring reducers

export default todoListSlice.reducer;
