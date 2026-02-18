import { type FC } from "react";
import { type Todo } from "../types/shared";
import Card from "./mobile-ui/Card/Card";
import TodoItemView from "./desktop-ui/TodoItemView/TodoItemView";

type ListProps = {
  todos: Todo[];
  variantUI: "mobile" | "desktop";
  variantPage: "home" | "organize";
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
};

//Todo: Integrar componentes cards como items :)

const List: FC<ListProps> = ({ todos, variantPage, variantUI, onEdit }) => {
  function renderListItems(todo: Todo) {
    const { id } = todo;
    if (variantUI === "mobile") {
      return (
        <li key={id}>
          {variantPage === "home" ? (
            <Card todo={todo} variant="home" />
          ) : (
            <Card todo={todo} variant="organize" onEdit={onEdit} />
          )}
        </li>
      );
    }
    return (
      <li key={id}>
        <TodoItemView todo={todo} variant="home" />
      </li>
    );
  }

  return <ol>{todos.map((todo) => renderListItems(todo))}</ol>;
};

export default List;
