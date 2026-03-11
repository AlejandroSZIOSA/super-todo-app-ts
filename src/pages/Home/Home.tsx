import { type FC, useState, type ReactNode, useRef, useEffect } from "react";
/* import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg"; */
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import TodoForm from "../../components/desktop-ui/TodoForm";
import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";
import Modal from "../../components/mobile-ui/Modal/Modal";

import { getCurrentDate } from "../../utils/calculations";
import Message from "../../components/Message";
import Header from "../../components/Header/Header";
import Card from "../../components/mobile-ui/Card/Card";
import TodoItem from "../../components/desktop-ui/TodoItem/TodoItem";

import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../../components/ConfirmDialog/ConfirmDialog";

import { getAllTodosDb } from "../../services/db/crudsDB";

import { type ConfirmDialogData } from "../../types/shared";
import {
  handleCreate,
  handleRemoveTodo,
  getTodosFromDb,
} from "../../utils/crudsREDUX";

import { translations } from "../../data/translations";

import styles from "./Home.module.css";

const HomePage: FC = () => {
  const [dialogData, setDialogData] = useState<ConfirmDialogData>({
    id: null,
    title: "",
    operation: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT); //It is working perfectly

  const dialogRef = useRef<ConfirmDialogRef>(null); //Imported type for ConfirmDialogRef

  const settings = useAppSelector((state: RootState) => state.settings);
  const TRANSLATION = translations[settings.language];
  const { homePage_T } = TRANSLATION;

  //fetch todos from db on component mount
  useEffect(() => {
    //load todos from db
    const fetchTodos = async () => {
      const todosDb = await getAllTodosDb();
      getTodosFromDb(dispatch, todosDb);
    };
    fetchTodos();
  }, [dispatch]);

  //manage no-scroll class on body
  //fixed: problem with side effect when the dialog is open and the user scrolls, the dialog closes but the scroll lock remains, this is to remove the scroll lock when the dialog is closed by any means.
  //if remove id todo is not null, it means that the dialog is open, so we add the no-scroll class to the body, if it is null, it means that the dialog is closed, so we remove the no-scroll class from the body.
  useEffect(() => {
    if (dialogData.id !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [dialogData.id]);

  const handleOpenDialog = (
    todoId: number,
    title: string,
    operation: string,
  ) => {
    setDialogData({ id: todoId, title: title, operation: operation });
    dialogRef.current?.onOpenDialog();
  };

  const confirmAction = () => {
    if (dialogData.id) {
      handleRemoveTodo(dispatch, dialogData.id);
      setDialogData({ id: null, operation: "", title: "" });
      //style class no-scroll is removed in the handleCancel function inside the ConfirmDialog component, this is to prevent the scroll lock when the dialog is closed after confirming the action.
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
        <h3>Add New Task</h3>
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
          <button
            className={styles.addTaskButton}
            onClick={() => setIsModalOpen(true)}
          >
            {!homePage_T ? "Add Task" : homePage_T.addBtn}
          </button>
        ) : (
          <h2>{!homePage_T ? "Home" : homePage_T.subHeaderTitle}</h2>
        )}
      </Header>
      <main>
        {content}
        {todos.length !== 0 ? (
          <ol>
            {todos.map((todo, index) => (
              <li key={todo.id}>
                {isMobile ? (
                  <Card
                    todoData={todo}
                    todoNumber={index}
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
