import { type FC } from "react";
import { type Todo } from "../types/shared";
import Card from "./mobile-ui/Card/Card";
import TodoItemView from "./desktop-ui/TodoItemView/TodoItemView";

type ListProps = {
  todos: Todo[];
  variant:
    | "mobile-ui-home"
    | "mobile-ui-organize"
    | "desktop-ui-home"
    | "desktop-ui-organize";
  handleEditAction?: (todoId: number) => void; //prop drilling x2 + call back
};

//Todo: Integrar componentes cards como items :)

const List: FC<ListProps> = ({ todos, variant, handleEditAction }) => {
  if (variant === "mobile-ui-home") {
    return (
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Card todo={todo} variant="home" />
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "desktop-ui-home") {
    return (
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItemView todo={todo} variant="home" />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Card
            todo={todo}
            variant="organize"
            handleEditAction={handleEditAction}
          />
        </li>
      ))}
    </ol>
  );
};

export default List;
