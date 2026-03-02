import { type FC, type ReactNode, useState, useEffect } from "react";
import { type Todo } from "../../../types/shared";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../utils/translations";

import Accordion from "../Accordion/Accordion";
import {
  handleChangeCompleteStatus,
  handleChangePriority,
} from "../../../utils/crudsCTX";
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
  const { id, title, description, priority, deadline, isComplete } = todoData;

  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.settings);
  //TODO:OBTENER VALORES DESDE REDUX STORE PARA SINCRONIZAR LOS CAMBIOS EN TIEMPO REAL CUANDO SE EDITA O CAMBIA EL ESTADO DE COMPLETADO DESDE EL CARD COMPONENT
  const [isDone, setIsDone] = useState<boolean>(false);

  const [selectedPriority, setSelectedPriority] = useState<
    "low" | "medium" | "high"
  >(priority ?? "low");

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
        <select
          value={selectedPriority}
          onChange={(e) => {
            const newPriority = e.target.value as "low" | "medium" | "high";
            setSelectedPriority(newPriority);
            handleChangePriority(dispatch, todoData, newPriority);
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
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
      <div className={styles.cardHeader}>
        <p>Event #{todoNumber}</p>
        <p>Priority : {selectedPriority}</p>
      </div>
      <Accordion title={title} description={description} isDone={isDone} />
      <p>Deadline : {deadline}</p>
      <p>Warning me Before: {settings.daysCountdown} days</p>

      <div className={styles.cardBtns}>{content}</div>
    </div>
  );
};

export default Card;
