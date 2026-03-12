import { type FC } from "react";

export interface SelectRootModalItemProps {
  value: string;
  children?: React.ReactNode;
  onSelect?: (value: string) => void;
}

const SelectItemModal: FC<SelectRootModalItemProps> = ({
  value,
  children,
  onSelect,
}) => {
  return (
    <button
      onClick={() => {
        if (onSelect) {
          onSelect(value);
        }
      }}
    >
      {children ? children : value}
    </button>
  );
};

export default SelectItemModal;
