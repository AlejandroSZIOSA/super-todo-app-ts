import { type FC, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { type Language } from "../../types/shared";

import { type RootState } from "../../store";
import { setLanguage } from "../../store/redux/languageSlice";

import {
  loadDaysRemainingCounter,
  saveDaysRemainingCounter,
} from "../../utils/localstorage/localstorage";

import SelectorItem from "./SelectorItem";
import { type SelectorItemProps } from "./SelectorItem";

type SelectorRootProps = {
  variant?: "Language" | "RemainDaysBeforeWarning";
  children?: React.ReactNode;
};

type SelectorRootComponent = FC<SelectorRootProps> & {
  Item: FC<SelectorItemProps>;
};

const SelectorRoot: SelectorRootComponent = ({ children, variant }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state: RootState) => state.language.current);
  const [warningDays, setWarningDays] = useState(loadDaysRemainingCounter());

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (variant === "Language") {
      changeLanguage(e.target.value as Language);
    } else {
      saveDaysRemainingCounter(Number(e.target.value));
      setWarningDays(Number(e.target.value));
    }
  };

  return (
    <select
      value={variant === "Language" ? language : warningDays}
      onChange={handleOnChange}
    >
      {children}
    </select>
  );
};
SelectorRoot.Item = SelectorItem;
export default SelectorRoot;
