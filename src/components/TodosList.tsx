import { type FC } from "react";
import { type Todo } from "../types/shared";

type TodosListProps = {
  list: Todo[];
};

const TodosList: FC<TodosListProps> = ({ list }) => {
  return (
    <ol>
      {list.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ol>
  );
};

export default TodosList;
