import { type FC, useState, type ReactNode } from "react";
/* import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg"; */
import List from "../components/List";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import TodoForm from "../components/desktop-ui/TodoForm";
import { v4 as uuid } from "uuid"; //create unique ids
import useMediaQuery from "../hooks/useMediaQuery";
import { CONSTANTS } from "../utils/constants";
import Modal from "../components/mobile-ui/Modal/Modal";

import Message from "../components/Message";
import Header from "../components/Header/Header";

const HomePage: FC = () => {
  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly
  const [open, setOpen] = useState(false);

  const handleCreate = (values: Omit<Todo, "id">) => {
    dispatch({ type: "todo-list/addTodo", payload: { id: uuid(), ...values } });
  };

  //jsx content variable
  let content: ReactNode;
  if (isMobile) {
    content = (
      <>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <TodoForm
            initialValues={{}}
            /* fix problem with the modal */
            onSubmit={(values) => {
              handleCreate(values);
              setOpen(false);
            }}
            operation="create"
            submitBtnLabel="Add"
          />
        </Modal>
      </>
    );
  } else {
    content = (
      <aside>
        <h3>Add Todo</h3>
        <TodoForm
          initialValues={{}}
          /* fix problem with the modal */
          onSubmit={(values) => {
            handleCreate(values);
            setOpen(false);
          }}
          operation="create"
          submitBtnLabel="Add"
        />
      </aside>
    );
  }

  return (
    <>
      <Header>
        {isMobile ? (
          <button onClick={() => setOpen(true)}>Add Todo</button>
        ) : (
          <h2>Home</h2>
        )}
      </Header>
      <main className="homePage_reusableBase__main">
        {content}
        {todos.length !== 0 ? (
          <List todos={todos} variant="mobile-ui-home" />
        ) : (
          <Message message="Empty List." />
        )}
      </main>
    </>
  );
};

export default HomePage;
