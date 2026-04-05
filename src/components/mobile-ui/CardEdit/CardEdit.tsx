import { type FC } from "react";
import type { Todo } from "../../../types/shared";

import { useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";

import { RemoveIcon, DeadLineIcon, EditIcon } from "../../../assets/icons";

import Accordion from "../Accordion/Accordion";

import styles from "./CardEdit.module.css";

import useMediaQuery, { RESOLUTIONS } from "../../../hooks/useMediaQuery";

interface CardEditProps {
  todoData: Todo;
  todoNumber: number;
  onEdit?: (todoId: number) => void; //prop drilling x1 + call back
  onRemove?: (todoId: number) => void;
}

let isWarningOn = false; //TODO: add warning me before feature, this is to manage the warning state, if the remaining days are less than the settings.daysCountdown, the warning will be on, otherwise it will be off, this is to manage the warning style in the card component.

let isExpired = false; //TODO: add expired status to the card component, this is to manage the expired style in the card component, if the remaining days are less than 0, the expired status will be true, otherwise it will be false.

const CardEdit: FC<CardEditProps> = ({
  todoData,
  todoNumber,
  onEdit,
  onRemove,
}) => {
  const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT);
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
  const { cardEdit_T } = TRANSLATION;

  isWarningOn =
    countRemainingDays(new Date(), deadline) <= settings.daysCountdown;

  isExpired = countRemainingDays(new Date(), deadline) < 0;

  return (
    <div className={styles.cardEditContainer}>
      <div
        className={`${styles.cardEditHeader} ${isExpired && styles.expired} ${isComplete && styles.success} ${isWarningOn ? styles.warningOn : styles.quite}`}
      >
        <p>#{todoNumber}</p>
        <p>
          {" "}
          <strong>
            {isExpired
              ? cardEdit_T
                ? cardEdit_T.expired
                : "Expired"
              : isComplete
                ? cardEdit_T
                  ? cardEdit_T.done
                  : "Done"
                : cardEdit_T
                  ? cardEdit_T.notDone
                  : "Not done"}
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
        <Accordion
          title={title}
          description={description}
          isDone={isComplete}
          isExpired={isExpired}
        />
        <p>
          {/*  <DeadLineIcon /> */}
          {cardEdit_T ? cardEdit_T.deadline : "Deadline"}:{" "}
          <strong>{deadline}</strong>
        </p>
      </div>

      {/* <p>Warning me Before: {settings.daysCountdown} days</p> */}

      <div className={styles.cardBtnsOrganizeContainer}>
        <button onClick={() => onEdit && onEdit(id)}>
          <EditIcon />
          {/* {cardEdit_T ? cardEdit_T.edit : "Edit"} */}
        </button>

        {/* TODO: add select component as modal for mobile */}
        <p>
          <strong>
            {cardEdit_T ? cardEdit_T.daysRemaining : "Days remained"}:{" "}
            {countRemainingDays(new Date(), deadline)}
          </strong>
        </p>
        <button onClick={() => onRemove && onRemove(id)}>
          <RemoveIcon />
          {/* {cardEdit_T ? cardEdit_T.remove : "Remove"} */}
        </button>
      </div>
    </div>
  );
};

export default CardEdit;
