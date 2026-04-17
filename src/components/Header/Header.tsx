import { type FC, type ReactNode } from "react";
import { type RootState } from "../../store";
import { useAppSelector } from "../../hooks/reduxHooks";

import EN_FLAG from "../../assets/images/flags/en.png";
import SV_FLAG from "../../assets/images/flags/sw.png";
import ES_FLAG from "../../assets/images/flags/es.png";

import { getDateDifferentLanguage } from "../../utils/calculations";
import { translations } from "../../data/translations";
import styles from "./Header.module.css";
import { DateIcon } from "../../assets/icons";
import { type DateLanguages } from "../../utils/calculations";

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const { language } = useAppSelector((state: RootState) => state.settings);
  const TRANSLATION = translations[language];
  const { homePage_T } = TRANSLATION;

  let flagContent: string = ""; // Initialize flagContent with an empty string
  let languageContent: DateLanguages;
  switch (language) {
    case "sv":
      flagContent = SV_FLAG;
      languageContent = "sv-SE";
      break;
    case "es":
      flagContent = ES_FLAG;
      languageContent = "es-ES";
      break;
    default:
      flagContent = EN_FLAG; // Default to English flag if language is not recognized
      languageContent = "en-US";
  }

  return (
    <header>
      <div className={styles.headerInnerContainer}>
        <div className={styles.appTitleContainer}>
          <h1>{homePage_T ? homePage_T.appTitle : "Task Reminder"}</h1>
          <div className={styles.currentDateContainerDesktop}>
            <DateIcon className={styles.dateIconDesktop} />
            <p>{getDateDifferentLanguage(languageContent)}</p>
          </div>
          <img src={flagContent} />
        </div>
        <div className={styles.currentDateContainer}>
          <DateIcon className={styles.dateIcon} />
          <p>{getDateDifferentLanguage(languageContent)}</p>
        </div>
      </div>

      {children && <div className={styles.childrenContainer}>{children}</div>}
    </header>
  );
};

export default Header;
