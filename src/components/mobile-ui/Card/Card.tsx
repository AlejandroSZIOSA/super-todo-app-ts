import { type FC, useState, useEffect } from "react";
import type { Todo, Priority } from "../../../types/shared";

import { RemoveIcon, DeadLineIcon } from "../../../assets/icons";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";

import Accordion from "../Accordion/Accordion";
import { handleToggleCompleteStatus } from "../../../utils/crudsREDUX";

import styles from "./Card.module.css";
import PriorityMark from "../../PriorityMark/PriorityMark";

interface CardProps {
  todoData: Todo;
  todoNumber: number;
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

let isWarningOn = false; //TODO: add warning me before feature, this is to manage the warning state, if the remaining days are less than the settings.daysCountdown, the warning will be on, otherwise it will be off, this is to manage the warning style in the card component.
let isExpired = false; //TODO: add expired status to the card component, this is to manage the expired style in the card component, if the remaining days are less than 0, the expired status will be true, otherwise it will be false.

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
  const TRANSLATION = translations[settings.language];
  const { cardView_T } = TRANSLATION;

  //sync isDone with isComplete from the store
  useEffect(() => {
    setIsDone(isComplete);
  }, [isComplete]);

  isWarningOn =
    countRemainingDays(new Date(), deadline) <= settings.daysCountdown;

  isExpired = countRemainingDays(new Date(), deadline) < 0;
  //jsx content variable

  return (
    <div className={styles.cardHomeContainer}>
      <div
        className={`${styles.cardHomeHeader} ${isWarningOn ? styles.warningShow : styles.warningNotShow}`}
      />
      <div className={styles.cardHomeSubHeader}>
        <p>#{todoNumber}</p>
        <p>
          <strong>
            {isExpired && !isDone
              ? cardView_T
                ? cardView_T.expired
                : "Expired"
              : isDone
                ? cardView_T
                  ? cardView_T.done
                  : "Done"
                : cardView_T
                  ? cardView_T.notDone
                  : "Not Done"}
          </strong>
        </p>
        <PriorityMark variant={selectedPriority} />
      </div>
      <div>
        <Accordion
          title={title}
          description={description}
          isDone={isDone}
          isExpired={isExpired}
        />
        <div className={styles.btnChangeStatusContainer}>
          {!isExpired && (
            <button
              className={`${styles.btnToggleStatus} ${isDone ? styles.isDone : styles.notDone} ${isExpired && !isDone ? styles.isExpired : ""}`}
              onClick={() =>
                handleToggleCompleteStatus(dispatch, todoData, isDone)
              }
              disabled={isExpired && !isDone}
            >
              {cardView_T ? cardView_T.changeStatusBtn : "Change status"}
            </button>
          )}
        </div>
        <p className={styles.daysRemaining}>
          {cardView_T ? cardView_T.daysRemaining : "Days remaining"} :{" "}
          {countRemainingDays(new Date(), deadline)}
        </p>
      </div>

      {/* <p>Warning me Before: {settings.daysCountdown} days</p> */}

      <div className={styles.cardHomeBtnsContainer}>
        {/*  <p>
          {cardView_T ? cardView_T.deadline : "Deadline"} : {deadline}
        </p> */}
        <div className={styles.deadLineContainer}>
          <DeadLineIcon />
          <span>{deadline}</span>
        </div>

        <button id="btn-remove-todo" onClick={() => onRemove && onRemove(id)}>
          <RemoveIcon />
          {/*  {!cardView_T ? "remove" : cardView_T.removeBtn} */}
        </button>
      </div>
    </div>
  );
};

export default Card;
