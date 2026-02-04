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
      <span>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </span>
      <span>
        <button>complete</button>
        {variant === "home" ? <button>remove</button> : <button>edit</button>}
      </span>
    </div>
  );
};

export default TodoItemView;
