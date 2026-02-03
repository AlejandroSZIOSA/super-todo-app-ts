import React, { type FC } from "react";
import { type Language } from "../../types/shared";

type WarningDaysAllowValues = 3 | 6 | 9;

export type SelectorItemProps = {
  value: Language | WarningDaysAllowValues;
  children: React.ReactNode;
};

const SelectorItem: FC<SelectorItemProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export default SelectorItem;
