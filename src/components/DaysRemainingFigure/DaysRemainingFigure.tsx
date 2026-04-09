import { type FC, type ReactNode } from "react";
import { TimeIcon } from "../../assets/icons";
import styles from "./DaysRemainingFigure.module.css";

import { translations } from "../../data/translations";
import { useAppSelector } from "../../hooks/reduxHooks";
import { type RootState } from "../../store";

interface DaysRemainingFigureProps {
  counter: number;
  variant: "expired-success" | "default";
}

//TODO:Do this component better
const DaysRemainingFigure: FC<DaysRemainingFigureProps> = ({
  counter,
  variant,
}) => {
  const settings = useAppSelector((state: RootState) => state.settings);
  const TRANSLATION = translations[settings.language];
  const { daysRemainingFig_T } = TRANSLATION;

  let headerContent: ReactNode;
  let footerContent: ReactNode;

  if (counter < -1) {
    const result = counter * -1;
    if (daysRemainingFig_T) {
      headerContent = daysRemainingFig_T.for + " " + result;
      footerContent = daysRemainingFig_T.days;
    } else {
      headerContent = "For " + result;
      footerContent = "days";
    }
  }

  if (counter === -1) {
    footerContent = daysRemainingFig_T
      ? daysRemainingFig_T.yesterday
      : "Yesterday";
  }

  if (counter === 1) {
    footerContent = daysRemainingFig_T
      ? daysRemainingFig_T.tomorrow
      : "Tomorrow";
  }

  if (counter > 1) {
    if (daysRemainingFig_T) {
      headerContent = daysRemainingFig_T.in + " " + counter;
      footerContent = daysRemainingFig_T.days;
    } else {
      headerContent = "In " + counter;
      footerContent = "days";
    }
  }

  if (counter === 0) {
    footerContent = daysRemainingFig_T ? daysRemainingFig_T.today : "Today";
  }
  return (
    <div
      className={
        variant === "default"
          ? styles.daysRemainingContainer
          : styles.expiredRemainingContainer
      }
    >
      {counter !== 0 && <p>{headerContent}</p>}
      <div
        className={
          variant === "default"
            ? styles.timeIconContainer
            : styles.expiredTimeIconContainer
        }
      >
        <TimeIcon style={{ width: "28", height: "auto" }} />
        <p>{footerContent}</p>
      </div>
    </div>
  );
};

export default DaysRemainingFigure;
