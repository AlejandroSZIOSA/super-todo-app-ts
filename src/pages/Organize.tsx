import { type FC, useEffect, useState } from "react";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";

import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

import List from "../components/List";
import TodoForm from "../components/TodoForm";

const OrganizePage: FC = () => {
  const [todoEdit, setTodoEdit] = useState<Todo>({
    id: 0,
    title: "",
    description: "",
  });

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch(); // Correctly assign useAppDispatch

  /* useEffect(() => {
  const todoToEdit = todosRedux.find((todo) => todo?.id === todoId);



}, []); */

  //callback Fn Edit
  function handleEditTodo(todoId: number) {
    console.log("Edit todo with ID:", todoId);

    const todo = todos.find((todo) => todo?.id === todoId);

    if (todo) {
      setTodoEdit(todo);
    } else {
      console.error(`Todo with ID ${todoId} not found.`);
    }
  }

  /*   function handleEditTodoState(updatedTodo: Todo) {
    dispatch({
      type: "todo-list/updateTodo",
      payload: { ...updatedTodo },
    });
  } */

  return (
    <div>
      <h1>Organize Page </h1>

      <TodoForm
        initialValues={todoEdit}
        onSubmit={() => {}}
        operation="edit"
        submitLabel="Edit"
      />
      <List
        todos={todos}
        variant="mobile-ui-organize"
        handleEditAction={handleEditTodo} //callback function passed down x2
      />
    </div>
  );
};

export default OrganizePage;
