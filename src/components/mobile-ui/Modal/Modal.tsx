import { type ReactNode } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  label: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  label,
  children,
}: ModalProps) {
  if (!isOpen) {
    document.body.classList.remove("no-scroll"); //fixed: scrolling in mobile :)
    return; //TODO: review this
  } else {
    document.body.classList.add("no-scroll"); //fixed: scrolling in mobile :)
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.labelContainer}>
          <h2>{label}</h2>
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
