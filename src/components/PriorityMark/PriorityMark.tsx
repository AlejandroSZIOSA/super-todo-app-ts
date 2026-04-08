import { type FC } from "react";
import styles from "./PriorityMark.module.css";

interface Props {
  variant: "low" | "medium" | "high";
}
const PriorityMark: FC<Props> = ({ variant: priority }) => {
  return <div className={styles[priority]}></div>;
};
export default PriorityMark;
