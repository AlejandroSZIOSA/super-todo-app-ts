import { type FC } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import { useDispatch, useSelector } from "react-redux";
import TodosList from "../components/List";

import { type Todo } from "../types/shared";

import { type RootState } from "../store/redux/store";

import { type AppDispatch } from "../store/redux/store";

const HomePage: FC = () => {
  const dispatchRedux = useDispatch<AppDispatch>();

  const todosRedux = useSelector((state: RootState) => state.todos); // Use RootState for type safety

  function handleAddTodo() {
    // Dispatch an action to add a new todo
    dispatchRedux({
      type: "list/addTodo",
      payload: {
        id: Date.now(),
        title: "New Todo",
        description: "This is a new todo item",
        deadline: "2024-12-31",
        isCompleted: false,
      },
    });
  }

  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>home page</h1>
      <button onClick={handleAddTodo}>Add todo </button>
      <TodosList list={todosRedux as Todo[]} />
    </>
  );
};

export default HomePage;
