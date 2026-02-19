import { type FC } from "react";
import { type Todo } from "../types/shared";
import Card from "./mobile-ui/Card/Card";
import TodoItem from "./desktop-ui/TodoItem/TodoItem";

type ListProps = {
  todos: Todo[];
  screenSize: "mobile" | "desktop";
  page: "home" | "organize";
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
};

//Todo: Integrar componentes cards como items :)

const List: FC<ListProps> = ({ todos, page, screenSize, onEdit }) => {
  function renderListItems(todo: Todo) {
    const { id } = todo;
    if (screenSize === "mobile") {
      return (
        <li key={id}>
          {page === "home" ? (
            <Card todoData={todo} page="home" />
          ) : (
            <Card todoData={todo} page="organize" onEdit={onEdit} />
          )}
        </li>
      );
    }
    return (
      <li key={id}>
        <TodoItem todoData={todo} page={page} onEdit={onEdit} />
      </li>
    );
  }

  return <ol>{todos.map((todo) => renderListItems(todo))}</ol>;
};

export default List;
