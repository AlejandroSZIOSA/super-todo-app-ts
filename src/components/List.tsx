import { type FC } from "react";
import { type Todo } from "../types/shared";
import CardView from "./mobile-ui/CardView";

type ListProps = {
  todos: Todo[];
  variant?: "mobile-ui" | "desktop-ui";
};

//Todo: Add children

const List: FC<ListProps> = ({ todos, variant }) => {
  return (
    <>
      {variant === "mobile-ui" ? (
        <ol>
          {todos.map((todo) => (
            <li key={todo.id}>
              <CardView todo={todo} variant="home" />
            </li>
          ))}
        </ol>
      ) : null}
    </>
  );
};

export default List;
