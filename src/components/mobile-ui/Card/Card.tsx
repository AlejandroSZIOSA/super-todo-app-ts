import { type FC, useState } from "react";
import type { Todo, Priority } from "../../../types/shared";
import { ICONS_CARDS_WIDTH } from "../../../utils/constants";

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
  const { language, daysCountdown } = useAppSelector(
    (state: RootState) => state.settings,
  );

  /*   
  const [isDone, setIsDone] = useState<boolean>(false);
 */
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
            {/* <span>{cardView_T ? cardView_T.quite : "Quite"}</span> */}
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
            {isExpired && !isComplete
              ? cardView_T
                ? cardView_T.expired
                : "Expired"
              : isComplete
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
            isDone={isComplete}
            isExpired={isExpired}
            variant="home"
          />
        </div>
        <div className={styles.btnChangeStatusContainer}>
          {!isExpired && (
            <>
              <button
                className={`${styles.btnToggleStatus} ${isComplete && styles.done} ${!isComplete && styles.notDone} ${isWarningOn && !isComplete && styles.notDoneAndWarning} ${isWarningOn && isComplete && styles.done}`}
                onClick={() =>
                  handleToggleCompleteStatus(dispatch, todoData, isComplete)
                }
                disabled={isExpired && !isComplete}
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
