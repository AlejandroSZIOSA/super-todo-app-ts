import { type FC } from "react";
import { type Todo } from "../types/shared";
import CardView from "./mobile-ui/CardView";

type ListProps = {
  todos: Todo[];
  variant: "mobile-ui-home" | "mobile-ui-organize";
  handleEditAction?: (todoId: number) => void; //prop drilling x2 + call back
};

//Todo: Add children

const List: FC<ListProps> = ({ todos, variant, handleEditAction }) => {
  if (variant === "mobile-ui-home") {
    return (
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            <CardView todo={todo} variant="home" />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>
          <CardView
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
