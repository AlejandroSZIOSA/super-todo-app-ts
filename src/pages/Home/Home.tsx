import {
  type FC,
  useState,
  type ReactNode,
  useRef,
  useEffect,
  useMemo,
} from "react";
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import TodoForm from "../../components/TodoForm/TodoForm";
import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";
import Modal from "../../components/mobile-ui/Modal/Modal";
import { getCurrentDateInput, sortedTodosFn } from "../../utils/calculations";
import Message from "../../components/Message";
import Header from "../../components/Header/Header";
import Card from "../../components/mobile-ui/Card/Card";

import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../../components/ConfirmDialog/ConfirmDialog";

import { type ConfirmDialogData } from "../../types/shared";
import { handleCreate, handleRemoveTodo } from "../../utils/crudsREDUX";

import { translations } from "../../data/translations";

import styles from "./Home.module.css";
import AsidePanel from "../../components/desktop-ui/AsidePanelOperations/AsidePanel";

import BarLoader from "../../components/BarLoader/BarLoader";

import useGetTasksFromDb from "../../hooks/useGetTasksFromDb";
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

  const { language } = useAppSelector((state: RootState) => state.settings);
  const TRANSLATION = translations[language];
  const { homePage_T } = TRANSLATION;

  //custom hook that persist all tasks from the database and manage the loading and error states, this is to prevent the code duplication and to keep the component clean and focused on the UI logic, and also to make it reusable in other components if needed.
  const { data, isLoading, error } = useGetTasksFromDb(dispatch); // Custom hook to fetch tasks from the database and manage loading and error states

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
          label={homePage_T ? homePage_T.modalAddTask : "Add Task"}
          onClose={() => setIsModalOpen(false)}
        >
          <TodoForm
            initialValues={{ deadline: getCurrentDateInput() }}
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
      <AsidePanel title={homePage_T ? homePage_T.addTask : "Add"}>
        <TodoForm
          initialValues={{ deadline: getCurrentDateInput() }}
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

  //filtered and sorted task by priority and deadline , and useMemo to optimize the performance by memoizing the sorted todos, so it will only re-calculate when the todos array changes, this is to prevent unnecessary re-renders and calculations when the component re-renders for other reasons.
  const sortedTodos = useMemo(() => sortedTodosFn(data), [data]);

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
          <>
            <h2>{!homePage_T ? "Your Tasks" : homePage_T.subHeaderTitle}</h2>
            {isLoading && (
              <div className={styles.loaderContainerDesktop}>
                <BarLoader />
              </div>
            )}
          </>
        )}
      </Header>
      <main>
        {content}

        {isMobile && isLoading && (
          <div className={styles.loaderContainer}>
            <BarLoader />
          </div>
        )}
        {error && <Message message={error} />}

        {sortedTodos.length === 0 && !isLoading && (
          <div className={styles.messageOuterContainer}>
            <Message message="Empty List." />
          </div>
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
