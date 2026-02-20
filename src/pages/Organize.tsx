import { type FC, useState, type ReactNode } from "react";
import { type Todo } from "../types/shared";
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

const OrganizePage: FC = () => {
  const [todoEdit, setTodoEdit] = useState<Omit<Todo, "id" | "isComplete">>({
    title: "",
    description: "",
    deadline: "",
  });

  const { todos } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch(); // Correctly assign useAppDispatch

  const isMobile = useMediaQuery(CONSTANTS.DESKTOP_BREAKPOINT); //It is working perfectly
  const [openModal, setOpenModal] = useState(false);

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

  //2-This function trigger after the validation Form
  const handleOnEdit = (values: Omit<Todo, "id">) => {
    dispatch({
      type: "todo-list/updateTodo",
      payload: { ...values },
    });
    setOpenModal(false);
  };

  function handleRemoveTodo(id: number) {
    dispatch({ type: "todo-list/removeTodo", payload: id });
  }

  //jsx content variable
  let content: ReactNode;
  if (isMobile) {
    content = (
      <>
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <TodoForm
            initialValues={todoEdit}
            onSubmit={handleOnEdit}
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
          onSubmit={handleOnEdit}
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
                    onRemove={handleRemoveTodo}
                  />
                ) : (
                  <TodoItem
                    todoData={todo}
                    page="organize"
                    onEdit={handleEditForm}
                    onRemove={handleRemoveTodo}
                  />
                )}
              </li>
            ))}
          </ol>
        ) : (
          <Message message="Empty List" />
        )}
      </main>
    </>
  );
};
export default OrganizePage;
