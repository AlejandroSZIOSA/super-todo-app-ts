import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { type Language } from "../types/shared";

import { type RootState } from "../store";
import { setLanguage } from "../store/redux/languageSlice";

const SelectorLanguages = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state: RootState) => state.language.current);

  const changeLanguage = (lang: Language) => {
    dispatch(setLanguage(lang));
  };

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value as Language)}
    >
      <option value="en">English</option>
      <option value="sv">Svenska</option>
    </select>
  );
};

export default SelectorLanguages;
