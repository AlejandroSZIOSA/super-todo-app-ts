import { type FC } from "react";
/* import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg"; */

import List from "../components/List";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import TodoForm from "../components/TodoForm";
import { v4 as uuid } from "uuid";
import MessageList from "../components/MessageList";

const HomePage: FC = () => {
  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const handleCreate = (values: Omit<Todo, "id">) => {
    dispatch({ type: "todo-list/addTodo", payload: { id: uuid(), ...values } });
  };

  return (
    <>
      <h1>Super Todo App</h1>
      <TodoForm
        initialValues={{}}
        onSubmit={handleCreate}
        operation="create"
        submitLabel="Create"
      />

      {todos ? (
        <List todos={todos} variant="mobile-ui-home" />
      ) : (
        <MessageList message="Empty Todos List. Please add a todo." />
      )}
    </>
  );
};

export default HomePage;
