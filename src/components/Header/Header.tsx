import { type FC, type ReactNode } from "react";
import styles from "./Header.module.css";

import { type RootState } from "../../store";
import { useAppSelector } from "../../hooks/reduxHooks";

import EN_FLAG from "../../assets/images/flags/en.png";
import SV_FLAG from "../../assets/images/flags/sw.png";
import ES_FLAG from "../../assets/images/flags/es.png";

import { translations } from "../../data/translations";

interface HeaderProps {
  children?: ReactNode;
}

//using constrains fix the problem with the children prop
const Header: FC<HeaderProps> = ({ children }) => {
  const { language } = useAppSelector((state: RootState) => state.settings);
  const settings = useAppSelector((state: RootState) => state.settings);
  //translations  en - swe as context param, this change the current language state
  const TRANSLATION =
    translations[settings.language as keyof typeof translations];
  const { homePage_T } = TRANSLATION;

  let flagContent: string = ""; // Initialize flagContent with an empty string
  switch (language) {
    case "en":
      flagContent = EN_FLAG;
      break;
    case "sv":
      flagContent = SV_FLAG;
      break;
    case "es":
      flagContent = ES_FLAG;
      break;
    default:
      flagContent = EN_FLAG; // Default to English flag if language is not recognized
  }

  return (
    <header>
      <div className={styles.appTitleContainer}>
        <h1>{!homePage_T ? "Task Remainder" : homePage_T.appTitle}</h1>
        <img src={flagContent} />
      </div>
      {children && <div className={styles.childrenContainer}>{children}</div>}
    </header>
  );
};

export default Header;
