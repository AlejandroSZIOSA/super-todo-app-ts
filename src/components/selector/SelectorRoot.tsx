import { type FC, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import type { Language, Theme } from "../../types/shared";

import { type RootState } from "../../store";
import { setLanguage } from "../../store/redux/languageSlice";

import {
  loadDaysRemainingCounter,
  saveDaysRemainingCounter,
} from "../../utils/localstorage/localstorage";

import SelectorItem from "./SelectorItem";
import { type SelectorItemProps } from "./SelectorItem";

import { setTheme } from "../../store/redux/themeSlice";

type SelectorRootProps = {
  variant?: "Language" | "RemainDaysBeforeWarning" | "Theme";
  children?: React.ReactNode;
};

type SelectorRootComponent = FC<SelectorRootProps> & {
  Item: FC<SelectorItemProps>;
};

const SelectorRoot: SelectorRootComponent = ({ children, variant }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state: RootState) => state.language.current);
  const theme = useAppSelector((state: RootState) => state.theme.current);
  const [warningDays, setWarningDays] = useState(loadDaysRemainingCounter());

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  const changeTheme = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (variant === "Language") {
      changeLanguage(e.target.value as Language);
    }
    if (variant === "RemainDaysBeforeWarning") {
      saveDaysRemainingCounter(Number(e.target.value));
      setWarningDays(Number(e.target.value));
    }
    if (variant === "Theme") {
      changeTheme(e.target.value as Theme);
    }
  };

  return (
    <select
      value={
        variant === "Language"
          ? language
          : variant === "RemainDaysBeforeWarning"
            ? warningDays
            : theme
      }
      onChange={handleOnChange}
    >
      {children}
    </select>
  );
};
SelectorRoot.Item = SelectorItem;
export default SelectorRoot;
