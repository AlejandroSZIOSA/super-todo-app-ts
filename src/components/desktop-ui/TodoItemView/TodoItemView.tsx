import { type FC } from "react";
import { type Todo } from "../../../types/shared";
import styles from "./TodoItemView.module.css";

interface TodoItemViewProps {
  todo: Todo;
  variant: "home" | "organize";
}

const TodoItemView: FC<TodoItemViewProps> = ({ todo, variant }) => {
  return (
    <div className={styles.todoItemContainer}>
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <div>
        <button>complete</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default TodoItemView;
