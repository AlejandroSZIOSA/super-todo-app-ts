import type { FC, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { type RootState } from "../../store";

import {
  saveSettings,
  type Settings,
} from "../../utils/localstorage/localstorage";

import SelectorItem, { type SelectorItemProps } from "./SelectorItem";
import { setSettings } from "../../store/redux/settingsSlice";

//fixed:created a key type for avoid type casting :)
type SelectorKey = keyof Settings;

type SelectorRootProps = {
  selectorIdentifier: SelectorKey;
  children?: React.ReactNode;
};

type SelectorRootComponent = FC<SelectorRootProps> & {
  Item: FC<SelectorItemProps>;
};

const SelectorRoot: SelectorRootComponent = ({
  children,
  selectorIdentifier,
}) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.settings);

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //NOTE: removed type casting with SelectorKey type, this is more robust and maintainable
    const key = selectorIdentifier;
    const newValue = e.target.value;

    const newSettings = {
      ...settings,
      [key]: newValue,
    };

    dispatch(setSettings(newSettings));
    saveSettings(newSettings);
  };

  return (
    <select value={settings[selectorIdentifier]} onChange={handleOnChange}>
      {children}
    </select>
  );
};
SelectorRoot.Item = SelectorItem; //Assigning the Item sub-component
export default SelectorRoot;
