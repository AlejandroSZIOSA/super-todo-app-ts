import { type FC } from "react";
import type { Todo } from "../../../types/shared";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";
import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";
import { RemoveIcon, EditIcon } from "../../../assets/icons";
import Accordion from "../Accordion/Accordion";
import styles from "./CardEdit.module.css";

interface CardEditProps {
  todoData: Todo;
  todoNumber: number;
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

const CardEdit: FC<CardEditProps> = ({ todoData, onEdit, onRemove }) => {
  /*   const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT); */
  const { id, title, description, priority, deadline, isComplete } = todoData;
  const settings = useAppSelector((state: RootState) => state.settings);
  //TODO: Deriver is done status from the store, this is to
  // prevent the problem with the sync between the local state and the store state,
  // this is to prevent the problem with the toggle complete status button, when the user click
  // on the button, the local state is updated but the store state is not updated yet, so the card component
  // is re-rendered with the old isComplete value from the store, this is to prevent that problem by deriving the
  // isDone state from the store state directly.

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION = translations[settings.language];
  const { cardEdit_T, daysRemainingFig_T } = TRANSLATION;

  let daysRemaining = countRemainingDays(new Date(), deadline);
  let isWarningOn =
    countRemainingDays(new Date(), deadline) <= settings.daysCountdown;
  let isExpired = countRemainingDays(new Date(), deadline) < 0;
  let isToday = countRemainingDays(new Date(), deadline) === 0;

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
          <p>
            <strong
              className={
                isToday && !isComplete && !isExpired ? styles.textExpired : ""
              }
            >
              {isToday && (cardEdit_T ? cardEdit_T.today : "Today")}
              {!isComplete &&
                !isExpired &&
                !isToday &&
                `${cardEdit_T ? cardEdit_T.daysRemaining : "Days remaining"} : 
              ${daysRemaining}`}
              {isExpired &&
                !isComplete &&
                `${daysRemainingFig_T ? daysRemainingFig_T.for : "For"} : ${daysRemaining * -1}
              ${daysRemaining > 1 ? `${daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}` : `${daysRemainingFig_T ? daysRemainingFig_T.day : "Day"}`}`}
              {isExpired &&
                isComplete &&
                `${daysRemainingFig_T ? daysRemainingFig_T.for : "For"} : 
              ${daysRemaining * -1} ${daysRemaining > 1 ? `${daysRemainingFig_T ? daysRemainingFig_T.days : "Days"}` : `${daysRemainingFig_T ? daysRemainingFig_T.day : "Day"}`}`}
              {isComplete &&
                !isToday &&
                !isExpired &&
                `${cardEdit_T ? cardEdit_T.daysRemaining : "Days remaining"} :
              ${daysRemaining}`}
            </strong>
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
              !isExpired &&
              (cardEdit_T ? cardEdit_T.verySoon : "Very soon")}
            {isWarningOn &&
              isToday &&
              !isComplete &&
              (cardEdit_T ? cardEdit_T.verySoon : "Very soon")}
          </span>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button onClick={() => onEdit && onEdit(id)}>
          <EditIcon style={{ width: "26", height: "auto" }} />
        </button>

        <p>
          {cardEdit_T ? cardEdit_T.deadline : "Deadline"}:{" "}
          <strong>{deadline}</strong>
        </p>

        <button onClick={() => onRemove && onRemove(id)}>
          <RemoveIcon style={{ width: "26", height: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default CardEdit;
