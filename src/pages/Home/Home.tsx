import { type FC, useState, type ReactNode, useRef, useEffect } from "react";
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import TodoForm from "../../components/TodoForm/TodoForm";
import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";
import Modal from "../../components/mobile-ui/Modal/Modal";

import { getCurrentDate, sortedTodosFn } from "../../utils/calculations";

import Message from "../../components/Message";
import Header from "../../components/Header/Header";
import Card from "../../components/mobile-ui/Card/Card";

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
import AsidePanel from "../../components/desktop-ui/AsidePanelOperations/AsidePanel";

import Spinner from "../../components/Spinner/Spinner";
import BarLoader from "../../components/BarLoader/BarLoader";

const HomePage: FC = () => {
  const [dialogData, setDialogData] = useState<ConfirmDialogData>({
    id: null,
    title: "",
    operation: "",
  });

  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error messages

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

    try {
      fetchTodos().then(() => setIsLoading(false)); // Set loading to false after fetching
    } catch (err) {
      setIsLoading(false); // Set loading to false if there's an error
      setError("Failed to load tasks. Please try again.");
    }
    /*     fetchTodos();
     */
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
        <Modal
          isOpen={isModalOpen}
          label={homePage_T ? homePage_T.addTask : "Add Task"}
          onClose={() => setIsModalOpen(false)}
        >
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
      <AsidePanel title={homePage_T ? homePage_T.addTask : "Add Task"}>
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
      </AsidePanel>
    );
  }

  //filtered and sorted task by priority and deadline

  const sortedTodos = sortedTodosFn(todos);

  return (
    <>
      <Header>
        {isMobile ? (
          <button
            className={styles.addTaskButton}
            onClick={() => setIsModalOpen(true)}
          >
            {!homePage_T ? "Add" : homePage_T.addBtn}
          </button>
        ) : (
          <h2>{!homePage_T ? "Home" : homePage_T.subHeaderTitle}</h2>
        )}
      </Header>
      <main>
        {content}
        {isLoading && !error && <BarLoader />}
        {error && !isLoading && <Message message={error} />}

        {sortedTodos.length === 0 && !isLoading && (
          <Message message="Empty List." />
        )}

        {sortedTodos.length > 0 && (
          <ol>
            {sortedTodos.map((todo) => (
              <li key={todo.id}>
                <Card
                  todoData={todo}
                  onRemove={(id) => handleOpenDialog(id, todo.title, "remove")}
                />
              </li>
            ))}
          </ol>
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
