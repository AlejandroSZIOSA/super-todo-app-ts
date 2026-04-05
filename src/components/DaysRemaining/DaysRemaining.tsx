import { type FC, type ReactNode } from "react";
import { TimeIcon } from "../../assets/icons";
import styles from "./DaysRemaining.module.css";

interface DaysRemainingProps {
  counter: number;
  variant: "expired-success" | "default";
}

const DaysRemaining: FC<DaysRemainingProps> = ({ counter, variant }) => {
  let content: ReactNode;

  if (counter === 0) {
    content = "Today";
  }
  if (counter < 0) {
    const result = counter * -1;
    content = "for " + result;
  }
  if (counter > 0) {
    content = "in " + counter;
  }
  return (
    <div
      className={
        variant === "default"
          ? styles.daysRemainingContainer
          : styles.expiredRemainingContainer
      }
    >
      {counter !== 0 && <p>{content}</p>}
      <div
        className={
          variant === "default"
            ? styles.timeIconContainer
            : styles.expiredTimeIconContainer
        }
      >
        <TimeIcon width={28} height="auto" />
        <p>{counter !== 0 ? "Days" : "Today"}</p>
      </div>
    </div>
  );
};

export default DaysRemaining;
