import { type FC, useState, type ReactNode, useRef } from "react";
/* import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg"; */
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
import Card from "../components/mobile-ui/Card/Card";
import TodoItem from "../components/desktop-ui/TodoItem/TodoItem";

import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../components/ConfirmDialog/ConfirmDialog";
import { getCurrentDate } from "../utils/calculations";

type SelectedTodo = {
  id?: number | null;
  operation: string;
};

const HomePage: FC = () => {
  //TODO:crear un objeto con informacion cambiar nombre a dialog data , incluidas funciones  .. mision aplicar en operacion "crear todo" :)
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo>({
    id: null,
    operation: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly

  const dialogRef = useRef<ConfirmDialogRef>(null); //Imported type for ConfirmDialogRef

  const handleCreate = (values: Omit<Todo, "id">) => {
    dispatch({ type: "todo-list/addTodo", payload: { id: uuid(), ...values } });
  };

  function handleRemoveTodo(id: number) {
    dispatch({ type: "todo-list/removeTodo", payload: id });
  }

  const handleOpenDialog = (todoId: number, operation: string) => {
    setSelectedTodo({ id: todoId, operation: operation });
    dialogRef.current?.onOpenDialog();
  };

  const confirmAction = () => {
    if (selectedTodo.id) {
      handleRemoveTodo(selectedTodo.id);
      setSelectedTodo({ id: null, operation: "" });
    }
  };

  //jsx content variable
  let content: ReactNode;
  if (isMobile) {
    content = (
      <>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TodoForm
            initialValues={{ deadline: getCurrentDate() }}
            /* fix problem with the modal */
            onSubmit={(values) => {
              handleCreate(values);
              setIsModalOpen(false);
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
          initialValues={{ deadline: getCurrentDate() }}
          /* fix problem with the modal */
          onSubmit={(values) => {
            handleCreate(values);
            setIsModalOpen(false);
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
          <button onClick={() => setIsModalOpen(true)}>Add Todo</button>
        ) : (
          <h2>Home</h2>
        )}
      </Header>
      <main className="homePage_reusableBase__main">
        {content}
        {todos.length !== 0 ? (
          <ol>
            {todos.map((todo) => (
              <li key={todo.id}>
                {isMobile ? (
                  <Card
                    todoData={todo}
                    page="home"
                    onRemove={(id) => handleOpenDialog(id, "remove")}
                  />
                ) : (
                  <TodoItem
                    todoData={todo}
                    page="home"
                    onRemove={(id) => handleOpenDialog(id, "remove")}
                  />
                )}
              </li>
            ))}
          </ol>
        ) : (
          <Message message="Empty List." />
        )}

        <ConfirmDialog
          ref={dialogRef}
          operation={selectedTodo.operation}
          onConfirm={confirmAction}
        />
      </main>
    </>
  );
};

export default HomePage;
