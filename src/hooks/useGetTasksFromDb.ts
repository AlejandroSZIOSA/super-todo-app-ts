import { useEffect, useState } from "react";
import { getAllTodosDb } from "../services/db/crudsDB";
import { getTodosFromDb } from "../utils/crudsREDUX";
import { useAppDispatch } from "./reduxHooks";
import { type Todo } from "../types/shared";

const useGetTasksFromDb = (dispatchData: ReturnType<typeof useAppDispatch>) => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [data, setData] = useState<Todo[]>([]); // State to manage fetched data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTodosDb();
        /*   getTodosFromDb(dispatchData, tasks); */
        setData(tasks); // Store fetched data in state
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        setError("Failed to load tasks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [dispatchData]);

  return { data, isLoading, error };
};

export default useGetTasksFromDb;
