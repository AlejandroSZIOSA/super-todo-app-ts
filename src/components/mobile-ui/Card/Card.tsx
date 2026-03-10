import { type FC, useState, useEffect } from "react";
import type { Todo, Priority } from "../../../types/shared";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";

import Accordion from "../Accordion/Accordion";
import { handleToggleCompleteStatus } from "../../../utils/crudsREDUX";

import styles from "./Card.module.css";

interface CardProps {
  todoData: Todo;
  todoNumber: number;
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

let isWarningOn = false; //TODO: add warning me before feature, this is to manage the warning state, if the remaining days are less than the settings.daysCountdown, the warning will be on, otherwise it will be off, this is to manage the warning style in the card component.

const Card: FC<CardProps> = ({ todoData, todoNumber, onRemove }) => {
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

  const [selectedPriority] = useState<Priority>(priority ?? "low");

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION =
    translations[settings.language as keyof typeof translations];
  const { cardView_T } = TRANSLATION;

  //sync isDone with isComplete from the store
  useEffect(() => {
    setIsDone(isComplete);
  }, [isComplete]);

  //derivering :)
  isWarningOn =
    countRemainingDays(new Date(), deadline) <= settings.daysCountdown;

  //jsx content variable

  return (
    <div className={styles.cardHomeContainer}>
      <div
        className={`${styles.cardHomeHeader} ${isWarningOn ? styles.warningShow : styles.warningNotShow}`}
      />

      <div className={styles.cardHomeSubHeader}>
        <p>#{todoNumber}</p>

        <p>{isDone ? "Done" : "Not Done"}</p>
        <div className={styles.priorityContainer}>
          <p>Priority </p>
          <span
            className={`${styles.prioritySignalColorContainer} ${selectedPriority === "high" ? styles.priorityHigh : selectedPriority === "medium" ? styles.priorityMedium : styles.priorityLow}     `}
          />
        </div>
      </div>

      <div>
        <Accordion title={title} description={description} isDone={isDone} />
        <div className={styles.btnChangeStatusContainer}>
          <button
            className={styles.btnToggleComplete}
            onClick={() =>
              handleToggleCompleteStatus(dispatch, todoData, isDone)
            }
          >
            CHANGE STATUS
          </button>
        </div>
        <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>
      </div>

      {/* <p>Warning me Before: {settings.daysCountdown} days</p> */}

      <div className={styles.cardHomeBtnsContainer}>
        <p>Deadline : {deadline}</p>
        <button id="btn-remove-todo" onClick={() => onRemove && onRemove(id)}>
          {!cardView_T ? "remove" : cardView_T.removeBtn}
        </button>
      </div>
    </div>
  );
};

export default Card;
