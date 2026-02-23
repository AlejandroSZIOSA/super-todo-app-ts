import { type FC, useState, type ReactNode, useRef, useEffect } from "react";
import type { Todo, ConfirmDialogData } from "../types/shared";
import type { RootState } from "../store";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import TodoForm from "../components/desktop-ui/TodoForm";
import { CONSTANTS } from "../utils/constants";
import useMediaQuery from "../hooks/useMediaQuery";
import Modal from "../components/mobile-ui/Modal/Modal";
import Header from "../components/Header/Header";
import Message from "../components/Message";
import TodoItem from "../components/desktop-ui/TodoItem/TodoItem";
import Card from "../components/mobile-ui/Card/Card";

import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../components/ConfirmDialog/ConfirmDialog";

import { handleRemoveTodo, handleOnEdit, todosFromDb } from "../utils/crudsCTX";
import { getAllTodosDb } from "../services/db/crudsDB";

const OrganizePage: FC = () => {
  const [todoEdit, setTodoEdit] = useState<Omit<Todo, "id" | "isComplete">>({
    title: "",
    description: "",
    deadline: "",
  });
  const [dialogData, setDialogData] = useState<ConfirmDialogData>({
    id: null,
    title: "",
    operation: "",
  });

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch(); // Correctly assign useAppDispatch

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly
  const [openModal, setOpenModal] = useState(false);

  const dialogRef = useRef<ConfirmDialogRef>(null); //Imported type for ConfirmDialogRef

  //fetch todos from db on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const todosDb = await getAllTodosDb();
      todosFromDb(dispatch, todosDb);
    };
    fetchTodos();
  }, [dispatch]);

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
    //NOTE:here can put more operations
    if (dialogData.id) {
      handleRemoveTodo(dispatch, dialogData.id);
      setDialogData({ id: null, title: "", operation: "" });
      document.body.classList.remove("no-scroll"); //fixed: scrolling when backdrop is active :)
    }
  };

  //jsx dynamic content
  let content: ReactNode;
  if (isMobile) {
    content = (
      <>
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
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
        <h3>Edit Todo</h3>
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
        <h2>Organize</h2>
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
                    page="organize"
                    onEdit={handleEditForm}
                    onRemove={(id) =>
                      handleOpenDialog(id, todo.title, "remove")
                    }
                  />
                ) : (
                  <TodoItem
                    todoData={todo}
                    page="organize"
                    onEdit={handleEditForm}
                    onRemove={(id) =>
                      handleOpenDialog(id, todo.title, "remove")
                    }
                  />
                )}
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
