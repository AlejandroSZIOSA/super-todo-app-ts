import { useEffect, type FC } from "react";
import { type Todo } from "../../../types/shared";

import { useAppDispatch } from "../../../hooks/reduxHooks";

import { useState } from "react";
import { countRemainingDays } from "../../../utils/calculations";

import { handleToggleCompleteStatus } from "../../../utils/crudsREDUX";

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

  return (
    <div className={styles.todoItemContainer}>
      <span>
        <h3>{title}</h3>
        <p>Deadline : {deadline}</p>
        <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>
      </span>
      <span>
        {page === "home" ? (
          <span>
            <label>
              {isDone ? "Completed" : "Mark as done"}
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => {
                  setIsDone(!isDone);
                  handleToggleCompleteStatus(dispatch, todoData, isDone);
                }}
              />
            </label>
          </span>
        ) : (
          <button onClick={() => onEdit && onEdit(id)}>Edit</button>
        )}
        <button onClick={() => onRemove && onRemove(id)}>remove</button>
        <p>desc: {description}</p>
      </span>
    </div>
  );
};

export default TodoItemView;
