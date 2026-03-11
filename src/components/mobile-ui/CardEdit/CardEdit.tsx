import { type FC, useState } from "react";
import type { Todo } from "../../../types/shared";

import { useAppSelector } from "../../../hooks/reduxHooks";
import { type RootState } from "../../../store";

import { countRemainingDays } from "../../../utils/calculations";
import { translations } from "../../../data/translations";

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
  const [isDone] = useState<boolean>(false);

  //translations  en - swe as context param, this change the current language state
  const TRANSLATION = translations[settings.language];
  const { cardView_T } = TRANSLATION;

  //derivering :)
  isWarningOn =
    countRemainingDays(new Date(), deadline) <= settings.daysCountdown;

  return (
    <div className={styles.cardEditContainer}>
      <div className={styles.cardEditHeader}>
        <p>#{todoNumber}</p>
        <p>status :{isComplete ? "Done" : "Not done"}</p>
        <div className={styles.organizePriorityContainer}>
          <p>Priority: {priority} </p>
        </div>
      </div>

      <div>
        <Accordion title={title} description={description} isDone={isDone} />
        <p>Deadline : {deadline}</p>
      </div>

      {/* <p>Warning me Before: {settings.daysCountdown} days</p> */}

      <div className={styles.cardBtnsOrganizeContainer}>
        <button onClick={() => onEdit && onEdit(id)}>Edit</button>

        {/* TODO: add select component as modal for mobile */}
        <p>Days remained : {countRemainingDays(new Date(), deadline)}</p>
        <button onClick={() => onRemove && onRemove(id)}>
          {!cardView_T ? "Remove" : cardView_T.removeBtn}
        </button>
      </div>
    </div>
  );
};

export default CardEdit;
