//Edit Page
import {
  type FC,
  useState,
  type ReactNode,
  useRef,
  useEffect,
  useMemo,
} from "react";
import type { Todo, ConfirmDialogData } from "../../types/shared";
import type { RootState } from "../../store";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import TodoForm from "../../components/TodoForm/TodoForm";
import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";
import Modal from "../../components/mobile-ui/Modal/Modal";
import Header from "../../components/Header/Header";
import Message from "../../components/Message";
import CardEdit from "../../components/mobile-ui/CardEdit/CardEdit";

import useGetTasksFromDb from "../../hooks/useGetTasksFromDb";
import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../../components/ConfirmDialog/ConfirmDialog";

import { handleRemoveTodo, handleOnEdit } from "../../utils/crudsREDUX";

import { translations } from "../../data/translations";
import { sortedTodosFn } from "../../utils/calculations";
import AsidePanel from "../../components/desktop-ui/AsidePanelOperations/AsidePanel";
import BarLoader from "../../components/BarLoader/BarLoader";

import styles from "./Organize.module.css";

const OrganizePage: FC = () => {
  const [todoEdit, setTodoEdit] = useState<Omit<Todo, "id" | "isComplete">>({
    title: "",
    description: "",
    deadline: "",
    priority: "low",
  });
  const [dialogData, setDialogData] = useState<ConfirmDialogData>({
    id: null,
    title: "",
    operation: "",
  });

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch(); // Correctly assign useAppDispatch

  const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT); //It is working perfectly
  const [openModal, setOpenModal] = useState(false);

  const dialogRef = useRef<ConfirmDialogRef>(null); //Imported type for ConfirmDialogRef

  const settings = useAppSelector((state: RootState) => state.settings);
  const TRANSLATION = translations[settings.language];
  const { editPage_T } = TRANSLATION;

  //fetch todos from db on component mount and after update the component
  /*  useEffect(() => {
    const fetchTodos = async () => {
      const todosDb = await getAllTodosDb();
      getTodosFromDb(dispatch, todosDb);
    };
    fetchTodos();
  }, [dispatch]); */

  const { isLoading, error } = useGetTasksFromDb(dispatch); // Custom hook to fetch tasks from the database and manage loading and error states

  //fixed: problem with dialog backdrop and scroll, when open the dialog the body is blocked to scroll but when close the dialog the body is still blocked, so I added a useEffect to remove the class "no-scroll" when the dialog is closed
  useEffect(() => {
    if (dialogData.id) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [dialogData]);

  //filtered and sorted task by priority and deadline, optimize using useMemo to prevent unnecessary calculations on every render, it will only recalculate when the todos array changes, this is to improve the performance of the component and prevent unnecessary re-renders of the child components that depend on the sortedTodos.
  const sortedTodos = useMemo(() => sortedTodosFn(todos), [todos]);

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

  //TODO: Use portals in dialog and modal next time
  const handleOpenDialog = (
    todoId: number,
    title: string,
    operation: string,
  ) => {
    setDialogData({ id: todoId, title: title, operation: operation });
    dialogRef.current?.onOpenDialog();
    /*     document.body.classList.add("no-scroll");
     */
  };

  const confirmAction = () => {
    //NOTE:here can put more operations
    if (dialogData.id) {
      handleRemoveTodo(dispatch, dialogData.id);
      setDialogData({ id: null, title: "", operation: "" });
      /* document.body.classList.remove("no-scroll"); */
    }
  };

  //jsx dynamic content
  let content: ReactNode;
  if (isMobile) {
    content = (
      <>
        <Modal
          label={editPage_T ? editPage_T.editTask : "Edit Task"}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        >
          <TodoForm
            initialValues={todoEdit}
            onSubmit={(values) => {
              handleOnEdit(dispatch, values);
              setOpenModal(false);
            }}
            operation="edit"
            submitBtnLabel="Save"
          />
        </Modal>
      </>
    );
  } else {
    content = (
      <AsidePanel title={editPage_T ? editPage_T.editTask : "Edit Task"}>
        <TodoForm
          initialValues={todoEdit}
          onSubmit={(values) => {
            handleOnEdit(dispatch, values);
            setOpenModal(false);
          }}
          operation="edit"
          submitBtnLabel="Save"
        />
      </AsidePanel>
    );
  }

  return (
    <>
      <Header>
        <h2>{editPage_T ? editPage_T.editTask : "Edit Task"}</h2>
        {!isMobile && isLoading && (
          <div className={styles.loaderContainerDesktop}>
            <BarLoader />
          </div>
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
            {sortedTodos.map((todo, index) => (
              <li key={todo.id}>
                <CardEdit
                  todoData={todo}
                  todoNumber={index}
                  onEdit={handleEditForm}
                  onRemove={(id) => handleOpenDialog(id, todo.title, "remove")}
                />
              </li>
            ))}
          </ol>
        )}
      </main>
      <ConfirmDialog
        ref={dialogRef}
        todoTitle={dialogData.title}
        operation={dialogData.operation}
        onConfirm={confirmAction}
      />
    </>
  );
};
export default OrganizePage;
