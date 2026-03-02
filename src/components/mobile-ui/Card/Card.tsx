import { type FC, type ReactNode, useState, useEffect } from "react";
import { type Todo } from "../../../types/shared";
import { countRemainingDays } from "../../../utils/calculations";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { translations } from "../../../utils/translations";

import Accordion from "../Accordion/Accordion";

import { handleChangeCompleteStatus } from "../../../utils/crudsCTX";

import styles from "./Card.module.css";

interface CardProps {
  todoData: Todo;
  page: "home" | "organize";
  todoNumber: number;
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

const Card: FC<CardProps> = ({
  todoData,
  page,
  todoNumber,
  onEdit,
  onRemove,
}) => {
  const { id, title, description, deadline, isComplete } = todoData;

  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.settings);
  const [isDone, setIsDone] = useState<boolean>(false);

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION = translations[settings.language];
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
        <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>
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
        <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>
        <button onClick={() => onRemove && onRemove(id)}>
          {cardView_T.removeBtn}
        </button>
      </>
    );
  }

  return (
    <div className={styles.cardContainer}>
      <p>Event #{todoNumber}</p>
      <Accordion title={title} description={description} isDone={isDone} />
      <p>Deadline : {deadline}</p>
      <p>Warning me Before: {settings.daysCountdown} days</p>
      <div className={styles.cardBtns}>{content}</div>
    </div>
  );
};

export default Card;
