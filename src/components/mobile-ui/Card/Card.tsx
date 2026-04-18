import { type FC, useState } from "react";
import type { Todo, Priority } from "../../../types/shared";
import { ICONS_CARDS_WIDTH } from "../../../utils/constants";

import { RemoveIcon, DeadLineIcon } from "../../../assets/icons";

import { useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";

import Accordion from "../Accordion/Accordion";

import styles from "./Card.module.css";
import PriorityMark from "../../PriorityMark/PriorityMark";
import DaysRemainingFigure from "../../DaysRemainingFigure/DaysRemainingFigure";
import { saveTodoDb } from "../../../services/db/crudsDB";

interface CardProps {
  todoData: Todo;
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: string) => void;
}

const Card: FC<CardProps> = ({ todoData, onRemove }) => {
  const { id, title, description, priority, deadline, isComplete } = todoData;
  const { language, daysCountdown } = useAppSelector(
    (state: RootState) => state.settings,
  );

  const [isDone, setIsDone] = useState<boolean>(isComplete);

  const [selectedPriority] = useState<Priority>(priority ?? "low");

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION = translations[language];
  const { cardView_T } = TRANSLATION;

  //sync isDone with isComplete from the store
  /*   useEffect(() => {
    setIsDone(isComplete);
  }, [isComplete]); */

  const daysRemaining = countRemainingDays(deadline);
  const isWarningOn = countRemainingDays(deadline) <= daysCountdown;
  const isExpired = countRemainingDays(deadline) < 0;
  /* const isExpired = true; */

  const handleToggleStatus = async (task: Todo, isComplete: boolean) => {
    try {
      saveTodoDb({ ...task, isComplete: !isComplete });
      setIsDone((prev) => !prev);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return;
    }
  };

  return (
    <div className={styles.cardHomeContainer}>
      <div
        className={`${styles.cardHomeHeader} ${isWarningOn && !isExpired && !isDone && styles.warningShow} ${!isWarningOn && !isDone && styles.warningNotShow} ${isExpired && styles.expired} ${isDone && styles.success}`}
      >
        {isWarningOn && !isExpired && !isDone && (
          <div className={styles.warningFigureTextContainer}>
            <div className={styles.warningFigures}>👀</div>
            <span>{cardView_T ? cardView_T.verySoon : "Soon"}</span>
          </div>
        )}
        {!isWarningOn && !isDone && (
          <div
            style={{ color: "#EEFF00" }}
            className={styles.warningFigureTextContainer}
          >
            <div className={styles.warningFigures}>🌾</div>{" "}
            {/* <span>{cardView_T ? cardView_T.quite : "Quite"}</span> */}
          </div>
        )}
        {isExpired && !isDone && (
          <div className={styles.warningFigures}> 🎈 </div>
        )}
        {isDone && <div className={styles.warningFigures}> 😃🎉✨</div>}
      </div>
      <div
        className={`${styles.cardHomeSubHeader} ${isWarningOn && !isExpired && !isDone && styles.subHeaderWarningOn} ${!isWarningOn && !isDone && styles.subHeaderWarningOff} ${isExpired && !isDone && styles.subHeaderExpired} ${isDone && styles.subHeaderSuccess} ${isDone && isExpired && styles.subHeaderSuccess}}`}
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
                className={`${styles.btnToggleStatus} ${isDone && styles.done} ${!isDone && styles.notDone} ${isWarningOn && !isDone && styles.notDoneAndWarning} ${isWarningOn && isDone && styles.done}`}
                onClick={() => handleToggleStatus(todoData, isComplete)}
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
              counter={countRemainingDays(deadline)}
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
          <RemoveIcon style={{ width: ICONS_CARDS_WIDTH, height: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default Card;
