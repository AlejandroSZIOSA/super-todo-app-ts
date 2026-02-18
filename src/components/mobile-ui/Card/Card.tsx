import { type FC, type ReactNode, useState, useEffect, useRef } from "react";
import { type Todo } from "../../../types/shared";
import { countRemainingDays } from "../../../utils/calculations";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { translations } from "../../../utils/translations";
import ConfirmDialog, {
  type ConfirmDialogRef,
} from "../ConfirmDialog/ConfirmDialog";

import { loadDaysRemainingCounter } from "../../../utils/localstorage/localstorage";
import Accordion from "../Accordion/Accordion";

interface CardProps {
  todo: Todo;
  variant: "home" | "organize";
  onEdit?: (todoId: number) => void; //prop drilling x2 + call back
}

const Card: FC<CardProps> = ({ todo, variant, onEdit }) => {
  const { id, title, description, deadline, isComplete } = todo;
  const dispatch = useAppDispatch();

  const language = useAppSelector((state: RootState) => state.language.current);

  const [isDone, setIsDone] = useState<boolean>(false);

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION = translations[language];

  const { cardView_T } = TRANSLATION;

  const dialogRef = useRef<ConfirmDialogRef>(null); //Imported type for ConfirmDialogRef

  //sync isDone with isComplete from the store
  useEffect(() => {
    setIsDone(isComplete);
  }, [isComplete]);

  function handleUpdateStatus() {
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

  //jsx content variable
  let content: ReactNode;
  if (variant === "home") {
    content = (
      <>
        <button onClick={handleUpdateStatus}>
          {isDone ? cardView_T.completeBtn : cardView_T.unCompleteBtn}
        </button>
        <button id="btn-remove-todo" onClick={handleOpenDialog}>
          {cardView_T.removeBtn}
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
        <button onClick={() => onEdit && onEdit(id)}>Edit</button>
        <button onClick={handleRemoveTodo}>{cardView_T.removeBtn}</button>
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
      {/* <p>{title}</p> */}
      <Accordion title={title} description={description} isDone={isDone} />
      <p>Deadline : {deadline}</p>
      <p>Warning me Before:{loadDaysRemainingCounter()} days</p>
      <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>

      <div>{content}</div>
    </div>
  );
};

export default Card;
