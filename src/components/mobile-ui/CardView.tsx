import { type FC, type ReactNode, useState, useEffect, useRef } from "react";
import { type Todo } from "../../types/shared";
import { countRemainingDays } from "../../utils/calculations";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { type RootState } from "../../store";

import { translations } from "../../utils/translations";
import ConfirmDialog, {
  type ConfirmDialogRef,
} from "./ConfirmDialog/ConfirmDialog";

interface CardViewProps {
  todo: Todo;
  variant: "home" | "organize";
  handleEditAction?: (todoId: number) => void; //prop drilling x2 + call back
}

const CardView: FC<CardViewProps> = ({ todo, variant, handleEditAction }) => {
  const { id, title, description, deadline, isComplete } = todo;
  const dispatch = useAppDispatch();

  const language = useAppSelector((state: RootState) => state.language.current);

  const [isDone, setIsDone] = useState<boolean>(false);

  //translations  en - swe as context param, this change the current language state
  const T = translations[language];

  const { cardViewT } = T;

  const dialogRef = useRef<ConfirmDialogRef>(null); //Imported type for ConfirmDialogRef

  //sync isDone with isComplete from the store
  useEffect(() => {
    setIsDone(isComplete);
  }, [isComplete]);

  function updateCompleteStatus() {
    dispatch({
      type: "todo-list/updateTodo",
      payload: { ...todo, isComplete: !isDone },
    });
  }

  function handleRemoveTodo() {
    dispatch({ type: "todo-list/removeTodo", payload: id });
  }

  //Dialog handlers
  const handleOpenDialog = () => {
    dialogRef.current?.open();
  };

  const confirmAction = () => {
    handleRemoveTodo(); // Call the remove function
  };

  let content: ReactNode;

  if (variant === "home") {
    content = (
      <>
        <button onClick={updateCompleteStatus}>
          {isDone ? cardViewT.completeBtn : cardViewT.unCompleteBtn}
        </button>
        <button id="btn-remove-todo" onClick={handleOpenDialog}>
          {cardViewT.removeBtn}
        </button>
        <ConfirmDialog
          ref={dialogRef}
          title="Remove Todo"
          message="Are you sure you remove?"
          onConfirm={confirmAction}
        />
      </>
    );
  }

  if (variant === "organize") {
    content = (
      <>
        <button onClick={() => handleEditAction && handleEditAction(id)}>
          Edit
        </button>
        <button onClick={handleRemoveTodo}>{cardViewT.removeBtn}</button>
        <ConfirmDialog
          ref={dialogRef}
          title="Edit Todo"
          message="Are you sure?"
          onConfirm={confirmAction}
        />
      </>
    );
  }

  return (
    <div>
      <h3>Todo - organize view</h3>
      <p>{title}</p>
      <p>{description}</p>
      <p>Deadline : {deadline}</p>
      <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>
      <div>{content}</div>
    </div>
  );
};

export default CardView;
