import { openDB, type DBSchema } from "idb";
import { type Todo } from "../../types/shared";

/* DB Schema */
interface TodoDB extends DBSchema {
  todos: {
    key: number;
    value: Todo;
    indexes: {
      "by-completed": string;
      "by-created": string;
    };
  };
}

/* Open DB */
export const dbPromise = openDB<TodoDB>("SuperTodoAppDB", 1, {
  upgrade(db) {
    const store = db.createObjectStore("todos", {
      keyPath: "id",
    });

    store.createIndex("by-completed", "completed");
    /* store.createIndex("by-created", "createdAt"); */
  },
});
