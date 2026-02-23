import { type FC, type ReactNode, useState, useEffect } from "react";
import { type Todo } from "../../../types/shared";
import { countRemainingDays } from "../../../utils/calculations";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { translations } from "../../../utils/translations";

import { loadDaysRemainingCounter } from "../../../utils/localstorage/localstorage";
import Accordion from "../Accordion/Accordion";

import { handleChangeCompleteStatus } from "../../../utils/crudsCTX";

interface CardProps {
  todoData: Todo;
  page: "home" | "organize";
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

const Card: FC<CardProps> = ({ todoData, page, onEdit, onRemove }) => {
  const { id, title, description, deadline, isComplete } = todoData;

  const dispatch = useAppDispatch();
  const language = useAppSelector((state: RootState) => state.language.current);

  const [isDone, setIsDone] = useState<boolean>(false);

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION = translations[language];

  const { cardView_T } = TRANSLATION;

  //sync isDone with isComplete from the store
  useEffect(() => {
    setIsDone(isComplete);
  }, [isComplete]);

  //jsx content variable
  let content: ReactNode;
  if (page === "home") {
    content = (
      <>
        <button
          onClick={() => handleChangeCompleteStatus(dispatch, todoData, isDone)}
        >
          {isDone ? cardView_T.completeBtn : cardView_T.unCompleteBtn}
        </button>
        <button id="btn-remove-todo" onClick={() => onRemove && onRemove(id)}>
          {cardView_T.removeBtn}
        </button>
      </>
    );
  }
  if (page === "organize") {
    content = (
      <>
        <button onClick={() => onEdit && onEdit(id)}>Edit</button>
        <button onClick={() => onRemove && onRemove(id)}>
          {cardView_T.removeBtn}
        </button>
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
