import { type FC, type ReactNode, useState, useEffect } from "react";
import { type Todo } from "../../../types/shared";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";

import Accordion from "../Accordion/Accordion";
import {
  handleToggleCompleteStatus,
  handleChangePriority,
} from "../../../utils/crudsREDUX";

import styles from "./Card.module.css";

interface CardProps {
  todoData: Todo;
  page: "home" | "organize";
  todoNumber: number;
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

let isWarningOn = false; //TODO: add warning me before feature, this is to manage the warning state, if the remaining days are less than the settings.daysCountdown, the warning will be on, otherwise it will be off, this is to manage the warning style in the card component.

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
  //TODO: Deriver is done status from the store, this is to
  // prevent the problem with the sync between the local state and the store state,
  // this is to prevent the problem with the toggle complete status button, when the user click
  // on the button, the local state is updated but the store state is not updated yet, so the card component
  // is re-rendered with the old isComplete value from the store, this is to prevent that problem by deriving the
  // isDone state from the store state directly.
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

  //derivering :)
  isWarningOn =
    countRemainingDays(new Date(), deadline) <= settings.daysCountdown;

  //jsx content variable
  let content: ReactNode;
  if (page === "home") {
    content = (
      <>
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
      <div
        className={`${styles.warningContainer} ${isWarningOn ? styles.warningShow : styles.warningNotShow}`}
      ></div>
      {page === "home" && <p>{isDone ? "Done" : "Not Done"}</p>}
      <div className={styles.cardHeader}>
        <p>#{todoNumber}</p>
        <p>Priority : {selectedPriority}</p>
      </div>
      <Accordion title={title} description={description} isDone={isDone} />
      {page === "home" && (
        <div className={styles.btnStatusContainer}>
          <button
            className={styles.btnToggleComplete}
            onClick={() =>
              handleToggleCompleteStatus(dispatch, todoData, isDone)
            }
          >
            CHANGE STATUS
          </button>
        </div>
      )}
      <p>Deadline : {deadline}</p>
      {/* <p>Warning me Before: {settings.daysCountdown} days</p> */}

      <div className={styles.cardBtns}>{content}</div>
    </div>
  );
};

export default Card;
