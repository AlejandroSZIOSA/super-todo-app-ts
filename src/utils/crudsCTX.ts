import { v4 as uuid } from "uuid"; //create unique ids
import { type Todo } from "../types/shared";
import type { AppDispatch } from "../store";

export function todosFromDb(dispatch: AppDispatch, todosDb: Todo[]) {
  dispatch({
    type: "todo-list/setTodosFromDb",
    payload: todosDb,
  });
}

export function handleCreate(dispatch: AppDispatch, values: Omit<Todo, "id">) {
  dispatch({ type: "todo-list/addTodo", payload: { id: uuid(), ...values } });
}

export function handleOnEdit(dispatch: AppDispatch, values: Omit<Todo, "id">) {
  dispatch({
    type: "todo-list/updateTodo",
    payload: { ...values },
  });
}

export function handleChangeCompleteStatus(
  dispatch: AppDispatch,
  todoData: Todo,
  isDone: boolean,
) {
  dispatch({
    type: "todo-list/updateTodo",
    payload: { ...todoData, isComplete: !isDone },
  });
}

export function handleRemoveTodo(dispatch: AppDispatch, id: number) {
  dispatch({ type: "todo-list/removeTodo", payload: id });
}
