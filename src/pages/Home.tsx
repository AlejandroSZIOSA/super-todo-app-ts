import { type FC } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import List from "../components/List";

import { type Todo } from "../types/shared";

import type { RootState } from "../store";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import TodoForm from "../components/TodoForm";
import { v4 as uuid } from "uuid";

const HomePage: FC = () => {
  const todosRedux = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const handleCreate = (values: Omit<Item, "id">) => {
    dispatch({ type: "todo-list/addTodo", payload: { id: uuid(), ...values } });
  };

  return (
    <>
      <h1>Vite + React + TS Todo App</h1>
      <TodoForm
        initialValues={{}}
        onSubmit={handleCreate}
        submitLabel="Create"
      />

      {/*   <button onClick={handleAddTodo}>Add todo </button> */}
      <List todos={todosRedux as Todo[]} variant="mobile-ui" />
    </>
  );
};

export default HomePage;
