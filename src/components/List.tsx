import { type FC, type ReactNode } from "react";
import { type Todo } from "../types/shared";

type TodosListProps = {
  list: Todo[];
  children?: ReactNode;
};

//Todo: Add children

const List: FC<TodosListProps> = ({ list, children }) => {
  return (
    <ol>
      {list.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
      {children}
    </ol>
  );
};

export default List;
