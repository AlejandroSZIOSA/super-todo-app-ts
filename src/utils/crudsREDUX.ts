import { type Task } from "../types/shared";
import type { AppDispatch } from "../store";
import { saveSettings, type Settings } from "../services/localstorage";

export function handleOnEdit(dispatch: AppDispatch, values: Omit<Task, "id">) {
  dispatch({
    type: "todo-list/updateTodo",
    payload: { ...values },
  });
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
