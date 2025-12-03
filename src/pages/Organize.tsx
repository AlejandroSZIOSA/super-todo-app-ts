import { type FC, useEffect, useState } from "react";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

import List from "../components/List";
import TodoForm from "../components/TodoForm";

const OrganizePage: FC = () => {
  const [todoEdit, setTodoEdit] = useState<Omit<Todo, "id">>({
    /*     id: 0, */
    title: "",
    description: "",
  });

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch(); // Correctly assign useAppDispatch

  useEffect(() => {});

  //callback FN set selected values todo item to the reusable form
  function handleSelectedEditTodo(todoId: number) {
    // console.log("Edit todo with ID:", todoId);
    const todo = todos.find((todo) => todo?.id === todoId);
    if (todo) {
      setTodoEdit(todo);
    } else {
      console.error(`Todo with ID ${todoId} not found.`);
    }
  }

  //2-This function trigger after the validation Form
  const onChangeTodoEditState = (values: Omit<Todo, "id">) => {
    console.log("Updated Todo:", todoEdit);
    dispatch({
      type: "todo-list/updateTodo",
      payload: { ...values },
    });
  };

  /* const handleEditRedux = () => {
    dispatch({ type: "todo-list/updateTodo", payload: { ...todoEdit } });
  }; */

  return (
    <div>
      <h1>Organize Page </h1>
      <TodoForm
        initialValues={todoEdit}
        onSubmit={onChangeTodoEditState}
        operation="edit"
        submitLabel="Edit"
      />
      <List
        todos={todos}
        variant="mobile-ui-organize"
        handleEditAction={handleSelectedEditTodo} //callback function passed down x2
      />
    </div>
  );
};

export default OrganizePage;
