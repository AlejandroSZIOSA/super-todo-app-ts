//NOTE: Configurations for IndexedDB operations related to todos.
// These functions are used in the utils/crudsCTX file to perform
// CRUD operations on the database.
import { dbPromise } from "./db";
import { type Todo } from "../../types/shared";

/* Create / Update */
export async function saveTodoDb(todo: Todo) {
  const db = await dbPromise;
  await db.put("todos", todo);
}

/* Get One */
export async function getTodoDb(id: number) {
  const db = await dbPromise;
  return db.get("todos", id);
}

/* Get All */
export async function getAllTodosDb() {
  const db = await dbPromise;
  return db.getAll("todos");
}

/* Get Completed */
export async function getCompletedTodosDb() {
  const db = await dbPromise;
  return db.getAllFromIndex("todos", "by-completed");
}

/* Delete */
export async function deleteTodoDb(id: number) {
  const db = await dbPromise;
  await db.delete("todos", id);
}

/* Clear All */
export async function deleteTodosDb() {
  const db = await dbPromise;
  await db.clear("todos");
}
