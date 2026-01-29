import { type FC, type ReactNode } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  children?: ReactNode;
}

//using constrains fix the problem with the children prop
const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header>
      <div className={styles.appTitleContainer}>
        <h1>Super Todo App</h1>
        <button className={styles.animationBtn}>Ani Btn</button>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </header>
  );
};

export default Header;
