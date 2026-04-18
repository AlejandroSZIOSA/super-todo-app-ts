import { useEffect, useState } from "react";
import { getAllTasksDb } from "../services/db/crudsDB";
import { type Task } from "../types/shared";

const useGetTasksFromDb = () => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [data, setData] = useState<Task[]>([]); // State to manage fetched data

  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasksDb();
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return { data, isLoading, setIsLoading, error, refetch: fetchTasks };
};

export default useGetTasksFromDb;
