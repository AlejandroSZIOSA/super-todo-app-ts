import { useEffect, useState } from "react";
import { getAllTodosDb } from "../services/db/crudsDB";
import { type Todo } from "../types/shared";

const useGetTasksFromDb = () => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [data, setData] = useState<Todo[]>([]); // State to manage fetched data

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

  useEffect(() => {
    fetchTasks();
  }, [data.length]); // Dependency array to re-fetch if the number of tasks changes

  return { data, isLoading, setIsLoading, error, refetch: fetchTasks };
};

export default useGetTasksFromDb;
