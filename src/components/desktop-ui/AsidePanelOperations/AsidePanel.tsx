import { type FC, type ReactNode } from "react";
import styles from "./AsidePanel.module.css";

import ALIAS_CAT_IMAGE from "../../../assets/images/alias/alias-image.png";

interface AsidePanelProps {
  title: string;
  children?: ReactNode;
}

const AsidePanel: FC<AsidePanelProps> = ({ children, title }) => {
  return (
    <aside className={styles.asidePanelRootContainer}>
      <div className={styles.formOuterContainer}>
        <h3 style={{ textAlign: "center" }}>{title}</h3>
        {children}
      </div>
      <div className={styles.logoContainer}>
        <span>
          <h3>Alias</h3>
        </span>
        <div className={styles.innerLogoContainer}>
          <img src={ALIAS_CAT_IMAGE} alt="logo" />
        </div>
      </div>
    </aside>
  );
};

export default AsidePanel;
