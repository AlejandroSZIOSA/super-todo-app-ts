import { type FC } from "react";

import styles from "./SelectModal.module.css";

interface SelectRootModalItemProps {
  value: string;
  onSelect?: (value: string) => void;
}

const SelectItemModal: FC<SelectRootModalItemProps> = ({ value, onSelect }) => {
  return (
    <button
      className={styles.modalItem}
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
