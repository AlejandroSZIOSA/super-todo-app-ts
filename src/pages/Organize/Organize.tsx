//Edit Page
import { type FC, useState, type ReactNode, useRef, useEffect } from "react";
import type { Todo, ConfirmDialogData } from "../../types/shared";
import type { RootState } from "../../store";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import TodoForm from "../../components/TodoForm/TodoForm";
import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";
import Modal from "../../components/mobile-ui/Modal/Modal";
import Header from "../../components/Header/Header";
import Message from "../../components/Message";
import TodoItem from "../../components/desktop-ui/TodoItem/TodoItem";
import CardEdit from "../../components/mobile-ui/CardEdit/CardEdit";

import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../../components/ConfirmDialog/ConfirmDialog";

import {
  handleRemoveTodo,
  handleOnEdit,
  getTodosFromDb,
} from "../../utils/crudsREDUX";
import { getAllTodosDb } from "../../services/db/crudsDB";

import { translations } from "../../data/translations";
import { sortedTodosFn } from "../../utils/calculations";

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

  //fetch todos from db on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const todosDb = await getAllTodosDb();
      getTodosFromDb(dispatch, todosDb);
    };
    fetchTodos();
  }, [dispatch]);

  //fixed: problem with dialog backdrop and scroll, when open the dialog the body is blocked to scroll but when close the dialog the body is still blocked, so I added a useEffect to remove the class "no-scroll" when the dialog is closed
  useEffect(() => {
    if (dialogData.id) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [dialogData]);

  //filtered and sorted task by priority and deadline
  const sortedTodos = sortedTodosFn(todos);

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
      <aside>
        <h3>Edit Task</h3>
        <TodoForm
          initialValues={todoEdit}
          onSubmit={(values) => {
            handleOnEdit(dispatch, values);
            setOpenModal(false);
          }}
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
        <h2>{editPage_T ? editPage_T.editTask : "Edit Task"}</h2>
      </Header>
      <main>
        {content}
        {sortedTodos.length !== 0 ? (
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
        ) : (
          <Message message="Empty List" />
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
