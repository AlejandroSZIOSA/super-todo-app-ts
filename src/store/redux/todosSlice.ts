import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Todo } from "../../types/shared";
import { saveTodoDb, deleteTodoDb } from "../../services/db/crudsDB";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [], //initial state is empty, we will load the todos from the db when the app starts, this is more efficient and prevent possible bugs with async state updates and localstorage loading.
};

export const todoListSlice = createSlice({
  name: "todo-list",
  initialState,
  reducers: {
    setTodosFromDb: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      /* saveTodos(state.todos); */
      saveTodoDb(action.payload); //save only the new todo to the db, not the entire list, this is more efficient and prevent possible bugs with async state updates and localstorage saving.
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      const todoId: number = action.payload;
      state.todos = state.todos.filter((item: Todo) => item.id !== todoId);
      /* saveTodos(state.todos); */
      deleteTodoDb(todoId); //delete only the removed todo from the db, not the entire list, this is more efficient and prevent possible bugs with async state updates and localstorage saving.
    },

    updateTodo: (state, action: PayloadAction<Todo>) => {
      const updatedItem = action.payload;
      const index = state.todos.findIndex(
        (item: Todo) => item.id === updatedItem.id, //fix problem using literals
      );
      if (index !== -1) {
        state.todos[index] = updatedItem;
        /*   saveTodos(state.todos); */

        saveTodoDb(updatedItem); //save only the updated todo to the db, not the entire list, this is more efficient and prevent possible bugs with async state updates and localstorage saving.
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
  setTodosFromDb,
  /* resetTodoList,
  setInitialList, */
} = todoListSlice.actions; //destructuring reducers

export default todoListSlice.reducer;
