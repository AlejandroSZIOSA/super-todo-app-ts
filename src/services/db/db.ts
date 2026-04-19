import { openDB, type DBSchema } from "idb";
import { type Task } from "../../types/shared";

/* DB Schema */
interface TasksDB extends DBSchema {
  tasksDB: {
    key: string;
    value: Task;
    indexes: {
      "by-completed": string;
      "by-created": string;
    };
  };
}

/* Open DB */
export const dbPromise = openDB<TasksDB>("TaskRemainderApp", 1, {
  upgrade(db) {
    const store = db.createObjectStore("tasksDB", {
      keyPath: "id",
    });

    store.createIndex("by-completed", "completed");
    /* store.createIndex("by-created", "createdAt"); */
  },
});
