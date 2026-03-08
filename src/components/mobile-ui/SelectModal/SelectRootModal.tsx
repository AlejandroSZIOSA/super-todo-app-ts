import React, {
  useState,
  type FC,
  type ReactNode,
  Children,
  useEffect,
} from "react";
import styles from "./SelectModal.module.css";
import SelectItemModal from "./SelectItemModal";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";

import { setSettings } from "../../../store/redux/settingsSlice";

import {
  saveSettings,
  type Settings,
} from "../../../utils/localstorage/localstorage";

type SelectorKey = keyof Settings;

interface SelectRootModalProps {
  selectorKey: SelectorKey;
  children: ReactNode;
}

interface SelectRootModalItemProps {
  value: string;
  onSelect?: (value: string) => void;
}

const SelectRootModal: FC<SelectRootModalProps> & {
  Item: FC<SelectRootModalItemProps>;
} = ({ children, selectorKey }) => {
  const settings = useAppSelector((state) => state.settings); //TODO: add settings selector, this is to get the current settings from the redux store, this is to manage the initial value of the select component in the language section, this is to show the current selected language in the select component.
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(settings[selectorKey] as string);

  //fixed: side effect problem
  useEffect(() => {
    const key = selectorKey;
    const newValue = value;
    const newSettings = {
      ...settings,
      [key]: newValue,
    };
    dispatch(setSettings(newSettings));
    saveSettings(newSettings);
  }, [selectorKey, value]);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
  };

  return (
    <>
      <button className={styles.selectBtn} onClick={() => setOpen(true)}>
        {value}
      </button>
      {open && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            {children &&
              Children.map(children, (child) => {
                if (React.isValidElement<SelectRootModalItemProps>(child)) {
                  return React.cloneElement(child, { onSelect: handleSelect });
                }
                return child;
              })}
          </div>
        </div>
      )}
    </>
  );
};

SelectRootModal.Item = SelectItemModal; // Assigning the Item sub-component

export default SelectRootModal;
