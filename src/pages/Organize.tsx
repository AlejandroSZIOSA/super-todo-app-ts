import { type FC } from "react";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";

import { useAppSelector } from "../hooks/reduxHooks";

import List from "../components/List";
import TodoForm from "../components/TodoForm";

const OrganizePage: FC = () => {
  const todosRedux = useAppSelector((state: RootState) => state.todos);

  function handleEdit(todoId: number) {
    console.log("Edit todo with ID:", todoId);
  }

  return (
    <div>
      <h1>Organize Page </h1>

      <TodoForm initialValues={{}} onSubmit={() => {}} submitLabel="Edit" />
      <List
        todos={todosRedux as Todo[]}
        variant="mobile-ui-organize"
        handleEditAction={handleEdit} //callback function passed down x2
      />
    </div>
  );
};

export default OrganizePage;
