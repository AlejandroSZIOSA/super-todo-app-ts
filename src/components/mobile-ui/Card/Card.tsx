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
import DaysRemaining from "../../DaysRemaining/DaysRemaining";

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
        className={`${styles.cardHomeHeader} ${isWarningOn && !isExpired && !isComplete && styles.warningShow} ${!isWarningOn && !isComplete && styles.warningNotShow} ${isExpired && styles.expired} ${isComplete && styles.success}`}
      >
        {isWarningOn && !isExpired && !isComplete && <div> 👀 Very soon </div>}
        {!isWarningOn && !isComplete && (
          <div style={{ color: "#EEFF00" }}> 🌾 Quite</div>
        )}
        {isExpired && <span> 🎈 </span>}
        {isComplete && <div> Successful ✨✨✨✨✨</div>}
      </div>
      <div
        className={`${styles.cardHomeSubHeader} ${isWarningOn && !isExpired && !isComplete && styles.subHeaderWarningOn} ${!isWarningOn && !isComplete && styles.subHeaderWarningOff} ${isExpired && styles.subHeaderExpired} ${isComplete && styles.subHeaderSuccess} }`}
      >
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
        <div className={styles.accordionOuterContainer}>
          <Accordion
            title={title}
            description={description}
            isDone={isDone}
            isExpired={isExpired}
          />
        </div>
        <div className={styles.btnChangeStatusContainer}>
          {!isExpired && (
            <>
              <button
                className={`${styles.btnToggleStatus} ${isDone && styles.done} ${!isDone && styles.notDone} ${isWarningOn && !isComplete && styles.notDoneAndWarning}   ${isWarningOn && isComplete && styles.done}`}
                onClick={() =>
                  handleToggleCompleteStatus(dispatch, todoData, isDone)
                }
                disabled={isExpired && !isDone}
              >
                {cardView_T ? cardView_T.changeStatusBtn : "Change status"}
              </button>

              <div className={styles.daysRemainingContainer}>
                <DaysRemaining
                  counter={countRemainingDays(new Date(), deadline)}
                  variant="default"
                />
              </div>
            </>
          )}
          {isExpired && (
            <DaysRemaining
              counter={countRemainingDays(new Date(), deadline)}
              variant="expired-success"
            />
          )}
        </div>
      </div>

      {/* <p>Warning me Before: {settings.daysCountdown} days</p> */}
      <hr></hr>
      <div className={styles.cardHomeBtnsContainer}>
        {/*  <p>
          {cardView_T ? cardView_T.deadline : "Deadline"} : {deadline}
        </p> */}
        <div className={styles.deadLineContainer}>
          <DeadLineIcon />
          <span>{deadline}</span>
        </div>

        <button id="btn-remove-todo" onClick={() => onRemove && onRemove(id)}>
          <RemoveIcon width={23} height="auto" />
          {/*  {!cardView_T ? "remove" : cardView_T.removeBtn} */}
        </button>
      </div>
    </div>
  );
};

export default Card;
