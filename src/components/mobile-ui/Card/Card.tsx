import { type FC, useState, useEffect } from "react";
import type { Todo, Priority } from "../../../types/shared";
import { ICONS_WIDTH } from "../../../utils/constants";

import { RemoveIcon, DeadLineIcon } from "../../../assets/icons";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";

import Accordion from "../Accordion/Accordion";
import { handleToggleCompleteStatus } from "../../../utils/crudsREDUX";

import styles from "./Card.module.css";
import PriorityMark from "../../PriorityMark/PriorityMark";
import DaysRemainingFigure from "../../DaysRemainingFigure/DaysRemainingFigure";

interface CardProps {
  todoData: Todo;

  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

const Card: FC<CardProps> = ({ todoData, onRemove }) => {
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

  const daysRemaining = countRemainingDays(new Date(), deadline);
  const isWarningOn =
    countRemainingDays(new Date(), deadline) <= settings.daysCountdown;
  const isExpired = countRemainingDays(new Date(), deadline) < 0;
  /* const isExpired = true; */

  return (
    <div className={styles.cardHomeContainer}>
      <div
        className={`${styles.cardHomeHeader} ${isWarningOn && !isExpired && !isComplete && styles.warningShow} ${!isWarningOn && !isComplete && styles.warningNotShow} ${isExpired && styles.expired} ${isComplete && styles.success}`}
      >
        {isWarningOn && !isExpired && !isComplete && (
          <div className={styles.warningFigureTextContainer}>
            <div className={styles.warningFigures}>👀</div>
            <span>{cardView_T ? cardView_T.verySoon : "Soon"}</span>
          </div>
        )}
        {!isWarningOn && !isComplete && (
          <div
            style={{ color: "#EEFF00" }}
            className={styles.warningFigureTextContainer}
          >
            <div className={styles.warningFigures}>🌾</div>{" "}
            <span>{cardView_T ? cardView_T.quite : "Quite"}</span>
          </div>
        )}
        {isExpired && !isComplete && (
          <div className={styles.warningFigures}> 🎈 </div>
        )}
        {isComplete && <div className={styles.warningFigures}> 😃🎉✨</div>}
      </div>
      <div
        className={`${styles.cardHomeSubHeader} ${isWarningOn && !isExpired && !isComplete && styles.subHeaderWarningOn} ${!isWarningOn && !isComplete && styles.subHeaderWarningOff} ${isExpired && !isComplete && styles.subHeaderExpired} ${isComplete && styles.subHeaderSuccess} ${isComplete && isExpired && styles.subHeaderSuccess}}`}
      >
        <p>ID-{id}</p>
        <p>
          <strong style={{ marginRight: "40px" }}>
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
            variant="home"
          />
        </div>
        <div className={styles.btnChangeStatusContainer}>
          {!isExpired && (
            <>
              <button
                className={`${styles.btnToggleStatus} ${isDone && styles.done} ${!isDone && styles.notDone} ${isWarningOn && !isComplete && styles.notDoneAndWarning} ${isWarningOn && isComplete && styles.done}`}
                onClick={() =>
                  handleToggleCompleteStatus(dispatch, todoData, isDone)
                }
                disabled={isExpired && !isDone}
              >
                {cardView_T ? cardView_T.changeStatusBtn : "Change status"}
              </button>

              <div className={styles.daysRemainingContainer}>
                <DaysRemainingFigure
                  counter={daysRemaining}
                  variant="default"
                />
              </div>
            </>
          )}
          {isExpired && (
            <DaysRemainingFigure
              counter={countRemainingDays(new Date(), deadline)}
              variant="expired-success"
            />
          )}
        </div>
      </div>

      <hr></hr>
      <div className={styles.cardHomeBtnsContainer}>
        <div className={styles.deadLineContainer}>
          <DeadLineIcon />
          <span>{deadline}</span>
        </div>

        <button
          id="btn-remove-todo"
          className={styles.btnRemove}
          onClick={() => onRemove && onRemove(id)}
        >
          <RemoveIcon style={{ width: ICONS_WIDTH, height: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default Card;
