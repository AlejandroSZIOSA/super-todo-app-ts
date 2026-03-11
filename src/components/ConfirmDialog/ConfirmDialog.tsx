import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import styles from "./ConfirmDialog.module.css";

import { type RootState } from "../../store";

import { useAppSelector } from "../../hooks/reduxHooks";

import { translations } from "../../data/translations";

type ConfirmDialogProps = {
  operation: string;
  todoTitle: string;
  onConfirm: () => void;
  /* onCancel?: () => void; */
};

export type ConfirmDialogRef = {
  onOpenDialog: () => void;
  onCloseDialog: () => void;
};

const ConfirmDialog = forwardRef<ConfirmDialogRef, ConfirmDialogProps>(
  ({ operation, todoTitle, onConfirm }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const settings = useAppSelector((state: RootState) => state.settings);

    //translations  en - swe as context param, this change the current language state
    const TRANSLATION = translations[settings.language];
    const { confirmDialog_T } = TRANSLATION;

    useImperativeHandle(ref, () => ({
      onOpenDialog: () => dialogRef.current?.showModal(),
      onCloseDialog: () => dialogRef.current?.close(),
    }));

    const handleConfirm = () => {
      onConfirm();
      dialogRef.current?.close();
      /* document.body.classList.remove("no-scroll");  */
    };

    const handleCancel = () => {
      dialogRef.current?.close();
      document.body.classList.remove("no-scroll");
    };

    let content: ReactNode;
    if (operation === "remove") {
      content = (
        <>
          <h1>
            {confirmDialog_T ? confirmDialog_T.confirmRemove : "Confirm Remove"}
          </h1>
          <p>
            {confirmDialog_T
              ? `${confirmDialog_T.removeTodoTitle} ${todoTitle}?`
              : `task with title: ${todoTitle}?`}
          </p>
        </>
      );
    }

    return (
      <dialog ref={dialogRef} className={styles.confirmDialogContainer}>
        {content}
        <div className={styles.buttonContainer}>
          <button onClick={handleCancel} className={styles.buttonCancel}>
            Cancel
          </button>
          <button onClick={handleConfirm} className={styles.buttonConfirm}>
            Accept
          </button>
        </div>
      </dialog>
    );
  },
);

export default ConfirmDialog;
