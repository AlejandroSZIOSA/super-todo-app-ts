import { type FC } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import { useDispatch, useSelector } from "react-redux";
import TodosList from "../components/TodosList";
import Header from "../components/Header";

import { type Todo } from "../types/shared";

const HomePage: FC = () => {
  const dispatchRedux = useDispatch();

  const todosRedux = useSelector((state: { todos: Todo[] }) => state.todos); //Fix problem with state type

  function handleAddTodo() {
    // Dispatch an action to add a new todo
    dispatchRedux({
      type: "todo-list/addTodo",
      payload: {
        id: Date.now(),
        title: "New Todo",
        description: "This is a new todo item",
        createdAt: new Date().toISOString(),
        deadline: "2024-12-31",
        isCompleted: false,
      },
    });
  }

  return (
    <div>
      <Header />
      <img src={reactLogo} className="logo react" alt="React logo" />
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>home page</h1>
      <button onClick={handleAddTodo}>Add todo </button>
      <TodosList list={todosRedux} />
    </div>
  );
};

export default HomePage;
