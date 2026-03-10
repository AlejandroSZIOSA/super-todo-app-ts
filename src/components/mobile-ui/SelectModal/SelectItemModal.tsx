import { type FC } from "react";

export interface SelectRootModalItemProps {
  value: string;
  onSelect?: (value: string) => void;
}

const SelectItemModal: FC<SelectRootModalItemProps> = ({ value, onSelect }) => {
  return (
    <button
      onClick={() => {
        if (onSelect) {
          onSelect(value);
        }
      }}
    >
      {value}
    </button>
  );
};

export default SelectItemModal;
