import { useEffect, useState } from "react";
import { getAllTodosDb } from "../services/db/crudsDB";
import { getTodosFromDb } from "../utils/crudsREDUX";
import { useAppDispatch } from "./reduxHooks";

const useGetTasksFromDb = (dispatchData: ReturnType<typeof useAppDispatch>) => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  useEffect(() => {
    //load todos from db
    const fetchTodos = async () => {
      const todosDb = await getAllTodosDb();
      getTodosFromDb(dispatchData, todosDb);
    };

    try {
      fetchTodos().then(() => setIsLoading(false)); // Set loading to false after fetching
    } catch (err) {
      setIsLoading(false); // Set loading to false if there's an error
      setError("Failed to load tasks. Please try again.");
    }
    /*     fetchTodos();
     */
  }, [dispatchData]);

  return { isLoading, error };
};

export default useGetTasksFromDb;
