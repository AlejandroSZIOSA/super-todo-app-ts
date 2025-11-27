import { type FC } from "react";

import { type Todo } from "../../types/shared";

interface TodoItemViewProps {
  todo: Todo;
}

const TodoItemView: FC<TodoItemViewProps> = ({ todo }) => {
  return (
    <div>
      <h3>Todo - home view desktop</h3>
      <p>{todo.title}</p>
      <p>{todo.description}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default TodoItemView;
