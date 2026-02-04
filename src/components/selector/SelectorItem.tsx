import React, { type FC } from "react";
import type { Language, Theme, DaysCountdown } from "../../types/shared";

export type SelectorItemProps = {
  value: Language | DaysCountdown | Theme;
  children: React.ReactNode;
};

const SelectorItem: FC<SelectorItemProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export default SelectorItem;
