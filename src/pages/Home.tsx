import { type FC, useState, type ReactNode, useRef, useEffect } from "react";
/* import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg"; */
import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import TodoForm from "../components/desktop-ui/TodoForm";
import useMediaQuery from "../hooks/useMediaQuery";
import { CONSTANTS } from "../utils/constants";
import Modal from "../components/mobile-ui/Modal/Modal";

import { getCurrentDate } from "../utils/calculations";
import Message from "../components/Message";
import Header from "../components/Header/Header";
import Card from "../components/mobile-ui/Card/Card";
import TodoItem from "../components/desktop-ui/TodoItem/TodoItem";

import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../components/ConfirmDialog/ConfirmDialog";

import { getAllTodosDb } from "../services/db/crudsDB";

import { type ConfirmDialogData } from "../types/shared";
import { handleCreate, handleRemoveTodo, todosFromDb } from "../utils/crudsCTX";

const HomePage: FC = () => {
  const [dialogData, setDialogData] = useState<ConfirmDialogData>({
    id: null,
    title: "",
    operation: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly

  const dialogRef = useRef<ConfirmDialogRef>(null); //Imported type for ConfirmDialogRef

  //fetch todos from db on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const todosDb = await getAllTodosDb();
      todosFromDb(dispatch, todosDb);
    };
    fetchTodos();
  }, [dispatch]);

  const handleOpenDialog = (
    todoId: number,
    title: string,
    operation: string,
  ) => {
    setDialogData({ id: todoId, title: title, operation: operation });
    dialogRef.current?.onOpenDialog();
    document.body.classList.add("no-scroll"); //fixed: scrolling when backdrop is active :)
  };

  const confirmAction = () => {
    if (dialogData.id) {
      handleRemoveTodo(dispatch, dialogData.id);
      setDialogData({ id: null, operation: "", title: "" });
      document.body.classList.remove("no-scroll"); //fixed: scrolling when backdrop is active :)
    }
  };

  //jsx dynamic content
  let content: ReactNode;
  if (isMobile) {
    content = (
      <>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TodoForm
            initialValues={{ deadline: getCurrentDate() }}
            /* fix problem with the modal */
            onSubmit={(values) => {
              handleCreate(dispatch, values);
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
            handleCreate(dispatch, values);
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
                    onRemove={(id) =>
                      handleOpenDialog(id, todo.title, "remove")
                    }
                  />
                ) : (
                  <TodoItem
                    todoData={todo}
                    page="home"
                    onRemove={(id) =>
                      handleOpenDialog(id, todo.title, "remove")
                    }
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
          todoTitle={dialogData.title}
          operation={dialogData.operation}
          onConfirm={confirmAction}
        />
      </main>
    </>
  );
};

export default HomePage;
