import { type FC, useState, type ReactNode } from "react";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import List from "../components/List";
import TodoForm from "../components/desktop-ui/TodoForm";
import { CONSTANTS } from "../utils/constants";
import useMediaQuery from "../hooks/useMediaQuery";
import Modal from "../components/mobile-ui/Modal/Modal";
import Header from "../components/Header/Header";
import Message from "../components/Message";

const OrganizePage: FC = () => {
  const [todoEdit, setTodoEdit] = useState<Omit<Todo, "id" | "isComplete">>({
    title: "",
    description: "",
  });

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch(); // Correctly assign useAppDispatch

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly
  const [openModal, setOpenModal] = useState(false);

  //callback FN set selected values todo item to the reusable form
  function handleEditForm(todoId: number) {
    setOpenModal(true);
    // console.log("Edit todo with ID:", todoId);
    const todo = todos.find((todo) => todo?.id === todoId);
    if (todo) {
      setTodoEdit(todo);
    } else {
      console.error(`Todo with ID ${todoId} not found.`);
    }
  }

  //2-This function trigger after the validation Form
  const handleOnEdit = (values: Omit<Todo, "id">) => {
    dispatch({
      type: "todo-list/updateTodo",
      payload: { ...values },
    });
    setOpenModal(false);
  };

  //jsx content variable
  let content: ReactNode;
  if (isMobile) {
    content = (
      <>
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <TodoForm
            initialValues={todoEdit}
            onSubmit={handleOnEdit}
            operation="edit"
            submitBtnLabel="Save"
          />
        </Modal>
      </>
    );
  } else {
    content = (
      <aside>
        <h3>Edit Todo</h3>
        <TodoForm
          initialValues={todoEdit}
          onSubmit={handleOnEdit}
          operation="edit"
          submitBtnLabel="Save"
        />
        <div> App logo</div>
      </aside>
    );
  }

  return (
    <>
      <Header>
        <h2>Organize</h2>
      </Header>
      <main className="homePage_reusableBase__main">
        {content}
        {todos.length !== 0 ? (
          <List
            todos={todos}
            screenSize={isMobile ? "mobile" : "desktop"}
            page="organize"
            onEdit={handleEditForm} //callback function passed down x2
          />
        ) : (
          <Message message="Empty List" />
        )}
      </main>
    </>
  );
};

export default OrganizePage;
