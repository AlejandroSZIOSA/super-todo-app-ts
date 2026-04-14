import { useEffect, useState } from "react";
import { getAllTodosDb } from "../services/db/crudsDB";
import { getTodosFromDb } from "../utils/crudsREDUX";
import { useAppDispatch } from "./reduxHooks";

const useGetTasksFromDb = (dispatchData: ReturnType<typeof useAppDispatch>) => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksDb = await getAllTodosDb();
        getTodosFromDb(dispatchData, tasksDb);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        setError("Failed to load tasks. Please try again.");
      } /* finally {
        setIsLoading(false);
      } */
    };
    fetchTasks();
  }, [dispatchData]);

  return { isLoading, error };
};

export default useGetTasksFromDb;
