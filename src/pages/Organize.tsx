import { type FC, useState, type ReactNode } from "react";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import List from "../components/List";
import TodoForm from "../components/desktop-ui/TodoForm";
import { CONSTANTS } from "../utils/constants";
import useMediaQuery from "../hooks/useMediaQuery";
import Modal from "../components/mobile-ui/Modal/Modal";

const OrganizePage: FC = () => {
  const [todoEdit, setTodoEdit] = useState<Omit<Todo, "id" | "isComplete">>({
    /*     id: 0, Omit fix the problem */
    title: "",
    description: "",
  });

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch(); // Correctly assign useAppDispatch

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly
  const [open, setOpen] = useState(false);

  //callback FN set selected values todo item to the reusable form
  function handleSelectedEditTodo(todoId: number) {
    setOpen(true);
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
    dispatch({
      type: "todo-list/updateTodo",
      payload: { ...values },
    });
    setOpen(false);
  };

  let content: ReactNode;

  if (isMobile) {
    content = (
      <>
        <>
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <TodoForm
              initialValues={todoEdit}
              onSubmit={onChangeTodoEditState}
              operation="edit"
              submitLabel="Edit"
            />
          </Modal>
          <List
            todos={todos}
            variant="mobile-ui-organize"
            handleEditAction={handleSelectedEditTodo} //callback function passed down x2
          />
        </>
      </>
    );
  } else {
    content = (
      <>
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
      </>
    );
  }

  return (
    <div>
      <h1>Organize Page </h1>
      {content}
    </div>
  );
};

export default OrganizePage;
