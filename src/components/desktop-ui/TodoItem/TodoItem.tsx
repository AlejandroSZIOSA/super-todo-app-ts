import { useEffect, type FC } from "react";
import { type Todo } from "../../../types/shared";

import { useAppDispatch } from "../../../hooks/reduxHooks";

import { useState } from "react";
import { countRemainingDays } from "../../../utils/calculations";

import styles from "./TodoItem.module.css";

interface TodoItemViewProps {
  todoData: Todo;
  page: "home" | "organize";
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void; //prop drilling x1 + call back
}

// TODO:PONER LENGUAJES
const TodoItemView: FC<TodoItemViewProps> = ({
  todoData,
  page,
  onEdit,
  onRemove,
}) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { id, title, description, deadline, isComplete } = todoData;

  //sync isDone with isComplete from the store
  useEffect(() => {
    setIsDone(isComplete);
  }, [isComplete]);

  function handleUpdateStatus() {
    dispatch({
      type: "todo-list/updateTodo",
      payload: { ...todoData, isComplete: !isDone },
    });
  }

  return (
    <div className={styles.todoItemContainer}>
      <span>
        <h3>{title}</h3>
        <p>Deadline : {deadline}</p>
        <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>
      </span>
      <p>desc: {description}</p>
      <span>
        {page === "home" ? (
          <button onClick={handleUpdateStatus}>
            {isDone ? "done" : "undone"}
          </button>
        ) : (
          <button onClick={() => onEdit && onEdit(id)}>Edit</button>
        )}
        <button onClick={() => onRemove && onRemove(id)}>remove</button>
      </span>
    </div>
  );
};

export default TodoItemView;
