import { type FC } from "react";
import type { Task } from "../../types/shared";
import { useAppSelector } from "../../hooks/reduxHooks";
import { type RootState } from "../../store";
import { countRemainingDays } from "../../utils/calculations";
import { translations } from "../../data/translations";
import { RemoveIcon, EditIcon } from "../../assets/icons";
import Accordion from "../Accordion/Accordion";
import styles from "./CardEdit.module.css";
import { ICONS_CARDS_WIDTH } from "../../utils/constants";

interface CardEditProps {
  todoData: Task;
  /* todoNumber: number; */
  onEdit?: (todoId: string) => void; //prop drilling x1 + call back
  onRemove?: (todoId: string) => void;
}

const CardEdit: FC<CardEditProps> = ({ todoData, onEdit, onRemove }) => {
  const { id, title, description, priority, deadline, isComplete } = todoData;
  const { language, daysCountdown } = useAppSelector(
    (state: RootState) => state.settings,
  );

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION = translations[language];
  const { cardEdit_T, daysRemainingFig_T } = TRANSLATION;

  //TODO create a const new date

  const daysRemaining = countRemainingDays(deadline);
  const isWarningOn = countRemainingDays(deadline) <= daysCountdown;
  const isExpired = countRemainingDays(deadline) < 0;
  const isToday = countRemainingDays(deadline) === 0;
  const isYesterday = countRemainingDays(deadline) === -1;
  const isTomorrow = countRemainingDays(deadline) === 1;

  //TODO:Fix this component using if else statements in a util function
  return (
    <div className={styles.cardEditContainer}>
      <div
        className={`${styles.cardEditHeader} ${isExpired && !isComplete && styles.expired} ${isExpired && isComplete && styles.done} ${isComplete && !isExpired && styles.done} ${isWarningOn && !isComplete && styles.warningOn} ${!isWarningOn && !isComplete && styles.quite} `}
      >
        <p>ID-{id}</p>
        <p>
          <strong>
            {isExpired &&
              !isComplete &&
              (cardEdit_T ? cardEdit_T.expired : "Expired")}
            {isExpired && isComplete && (cardEdit_T ? cardEdit_T.done : "Done")}
            {isComplete &&
              !isExpired &&
              (cardEdit_T ? cardEdit_T.done : "Done")}
            {!isComplete &&
              !isExpired &&
              (cardEdit_T ? cardEdit_T.notDone : "Not Done")}
          </strong>
        </p>
        <div className={styles.organizePriorityContainer}>
          <p>
            {cardEdit_T ? cardEdit_T.priority : "Priority"}:{" "}
            {priority === "low"
              ? cardEdit_T
                ? cardEdit_T.low
                : "Low"
              : priority === "medium"
                ? cardEdit_T
                  ? cardEdit_T.medium
                  : "Medium"
                : priority === "high"
                  ? cardEdit_T
                    ? cardEdit_T.high
                    : "High"
                  : "None"}{" "}
          </p>
        </div>
      </div>
      <div>
        <div className={styles.accordionOuterContainer}>
          <Accordion
            title={title}
            description={description}
            isDone={isComplete}
            isExpired={isExpired}
            variant="edit"
          />
        </div>
        <div className={`${styles.deadlineContainer} `}>
          <p
            className={
              isToday && !isComplete && !isExpired ? styles.textExpired : ""
            }
          >
            {isToday && (cardEdit_T ? cardEdit_T.today : "Today")}
            {isYesterday && (cardEdit_T ? cardEdit_T.yesterday : "Yesterday")}
            {isTomorrow && (cardEdit_T ? cardEdit_T.tomorrow : "Tomorrow")}
            {!isComplete &&
              !isExpired &&
              !isToday &&
              !isTomorrow &&
              `${cardEdit_T ? cardEdit_T.daysRemaining : "Days remaining"} : 
              ${daysRemaining}`}
            {isExpired &&
              !isComplete &&
              !isToday &&
              !isYesterday &&
              !isTomorrow &&
              `${daysRemainingFig_T ? daysRemainingFig_T.for : "For"} : ${daysRemaining * -1} ${daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}`}
            {isExpired &&
              isComplete &&
              !isToday &&
              !isYesterday &&
              !isTomorrow &&
              `${daysRemainingFig_T ? daysRemainingFig_T.for : "For"} : ${daysRemaining * -1} ${daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}`}
            {isComplete &&
              !isToday &&
              !isYesterday &&
              !isTomorrow &&
              !isExpired &&
              `${cardEdit_T ? cardEdit_T.daysRemaining : "Days remaining"} :
              ${daysRemaining}`}
          </p>
          <span
            className={
              isExpired && !isComplete
                ? `${styles.deadlineMessage} ${styles.textExpired}`
                : isComplete
                  ? `${styles.deadlineMessage} ${styles.textSuccess}`
                  : isWarningOn
                    ? `${styles.deadlineMessage} ${styles.deadlineMessageLeft} ${styles.textExpired}`
                    : `${styles.deadlineMessage} ${styles.deadlineMessageLeft}`
            }
          >
            {isExpired &&
              !isComplete &&
              (cardEdit_T ? cardEdit_T.expired : "Expired")}
            {isExpired &&
              isComplete &&
              (cardEdit_T ? cardEdit_T.success : "Success")}
            {isComplete &&
              !isExpired &&
              (cardEdit_T ? cardEdit_T.success : "Success")}
            {!isComplete &&
              !isExpired &&
              !isWarningOn &&
              (cardEdit_T ? cardEdit_T.quite : "Quite")}
            {isWarningOn &&
              !isToday &&
              !isComplete &&
              !isExpired &&
              (cardEdit_T ? cardEdit_T.verySoon : "Soon")}
            {isWarningOn &&
              isToday &&
              !isComplete &&
              !isExpired &&
              (cardEdit_T ? cardEdit_T.verySoon : "Soon")}
          </span>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button onClick={() => onEdit && onEdit(id)}>
          <EditIcon style={{ width: ICONS_CARDS_WIDTH, height: "auto" }} />
        </button>

        <p>
          <strong>
            {cardEdit_T ? cardEdit_T.deadline : "Deadline"}: {deadline}
          </strong>
        </p>

        <button onClick={() => onRemove && onRemove(id)}>
          <RemoveIcon style={{ width: ICONS_CARDS_WIDTH, height: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default CardEdit;
