//NOTE: Configurations for IndexedDB operations related to todos.
// These functions are used in the utils/crudsCTX file to perform
// CRUD operations on the database.
import { dbPromise } from "./db";
import { type Task } from "../../types/shared";

/* Create / Update */
export async function saveTaskDb(task: Task) {
  const db = await dbPromise;
  await db.put("tasksDB", task);
}

/* Get One */
/* export async function getTodoDb(id: number) {
  const db = await dbPromise;
  return db.get("todos", id);
} */

/* Get All */
export async function getAllTasksDb() {
  const db = await dbPromise;
  return db.getAll("tasksDB");

  //TODO IMPORTANT: Remove after testing
  /* const db = await dbPromise;
  return new Promise((resolve) => {
    setTimeout(async () => {
      const todos = await db.getAll("todos");
      resolve(todos);
    }, 3000);
  }); */
}

/* Get Completed */
export async function getCompletedTodosDb() {
  const db = await dbPromise;
  return db.getAllFromIndex("tasksDB", "by-completed");
}

/* Delete */
export async function deleteTaskDb(id: string) {
  const db = await dbPromise;
  await db.delete("tasksDB", id);
}

/* Clear All */
export async function deleteAllTasksDb() {
  const db = await dbPromise;
  await db.clear("tasksDB");
}
