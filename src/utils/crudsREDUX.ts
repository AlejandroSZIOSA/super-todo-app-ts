import { v4 as uuid } from "uuid"; //create unique ids
import { type Todo } from "../types/shared";
import type { AppDispatch } from "../store";
import { saveSettings, type Settings } from "../services/localstorage";

export function getTodosFromDb(dispatch: AppDispatch, todosDb: Todo[]) {
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

export function handleToggleCompleteStatus(
  dispatch: AppDispatch,
  todoData: Todo,
  isDone: boolean,
) {
  dispatch({
    type: "todo-list/updateTodo",
    payload: { ...todoData, isComplete: !isDone },
  });
}

export function handleChangePriority(
  dispatch: AppDispatch,
  todoData: Todo,
  priority: "low" | "medium" | "high",
) {
  dispatch({
    type: "todo-list/updateTodo",
    payload: { ...todoData, priority: priority },
  });
}

export function handleRemoveTodo(dispatch: AppDispatch, id: number) {
  dispatch({ type: "todo-list/removeTodo", payload: id });
}

export function handleDeleteAllTodos(dispatch: AppDispatch) {
  dispatch({ type: "todo-list/deleteAllTodos" });
}

export function handleChangeSettings(
  dispatch: AppDispatch,
  newSettings: Settings,
) {
  dispatch({
    type: "settings/setSettings",
    payload: newSettings,
  });
  saveSettings(newSettings);
}
