import { type FC } from "react";
import { type Todo } from "../types/shared";
import CardView from "./mobile-ui/CardView";

type ListProps = {
  todos: Todo[];
  variant: "mobile-ui-home" | "mobile-ui-organize";
};

//Todo: Add children

const List: FC<ListProps> = ({ todos, variant }) => {
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
          <CardView todo={todo} variant="organize" />
        </li>
      ))}
    </ol>
  );
};

export default List;
