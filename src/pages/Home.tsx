import { type FC, useState, type ReactNode, useEffect } from "react";
/* import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg"; */
import List from "../components/List";
import { type Todo } from "../types/shared";
import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import TodoForm from "../components/desktop-ui/TodoForm";
import { v4 as uuid } from "uuid"; //create unique ids
import MessageList from "../components/MessageList";
import useMediaQuery from "../hooks/useMediaQuery";
import { CONSTANTS } from "../utils/constants";
import Modal from "../components/mobile-ui/Modal/Modal";

import Header from "../components/Header/Header";

import { loadDaysRemainingCounter } from "../utils/localstorage/localstorage";

const HomePage: FC = () => {
  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly
  const [open, setOpen] = useState(false);

  const handleCreate = (values: Omit<Todo, "id">) => {
    dispatch({ type: "todo-list/addTodo", payload: { id: uuid(), ...values } });
  };

  useEffect(() => {
    //Continue from here :)
    const counterDaysUntilWarning = loadDaysRemainingCounter();
    console.log(counterDaysUntilWarning);
  }, []);

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
            submitLabel="Create"
          />
        </Modal>
      </>
    );
  } else {
    content = (
      <>
        <h3>Add Todo</h3>
        <TodoForm
          initialValues={{}}
          /* fix problem with the modal */
          onSubmit={(values) => {
            handleCreate(values);
            setOpen(false);
          }}
          operation="create"
          submitLabel="Create"
        />
      </>
    );
  }

  return (
    <>
      <Header>
        <button onClick={() => setOpen(true)}>Add Todo</button>
      </Header>
      <main>
        {content}
        {todos ? (
          <List todos={todos} variant="mobile-ui-home" />
        ) : (
          <MessageList message="Empty Todos List. Please add a todo." />
        )}
      </main>
    </>
  );
};

export default HomePage;
