import { type FC, type ReactNode } from "react";
import styles from "./AsidePanel.module.css";

interface AsidePanelProps {
  title: string;
  children?: ReactNode;
}

const AsidePanel: FC<AsidePanelProps> = ({ children, title }) => {
  return (
    <aside className={styles.asidePanelRootContainer}>
      <div className={styles.asidePanelInnerContainer}>
        <div className={styles.formOuterContainer}>
          <h3>{title}</h3>
          {children}
        </div>
        <div> image</div>
      </div>
    </aside>
  );
};

export default AsidePanel;
