import { type FC } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import List from "../components/List";

import { type Todo } from "../types/shared";

import type { RootState } from "../store";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const HomePage: FC = () => {
  const todosRedux = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      title: "New Todo Item",
      description: "This is a new todo item added from HomePage.",
      deadline: new Date().toISOString(),
      isCompleted: false,
    };
    // Dispatch an action to add the new todo
    dispatch({ type: "todo-list/addTodo", payload: newTodo });
  };

  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>Vite + React + TS Todo App</h1>
      <button onClick={handleAddTodo}>Add todo </button>
      <List todos={todosRedux as Todo[]} variant="mobile-ui" />
    </>
  );
};

export default HomePage;
