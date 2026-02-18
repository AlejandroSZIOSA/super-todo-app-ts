import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
  // Define any p title?: string;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export type ConfirmDialogRef = {
  open: () => void;
  close: () => void;
};

const ConfirmDialog = forwardRef<ConfirmDialogRef, ConfirmDialogProps>(
  (
    { title = "Confirm", message = "Are you sure?", onConfirm, onCancel },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: () => dialogRef.current?.close(),
    }));

    const handleConfirm = () => {
      onConfirm();
      dialogRef.current?.close();
    };

    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
      dialogRef.current?.close();
    };
    return (
      <dialog ref={dialogRef} className={styles.confirmDialogContainer}>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button onClick={handleCancel} className={styles.buttonCancel}>
            Cancel
          </button>
          <button onClick={handleConfirm} className={styles.buttonConfirm}>
            Confirm
          </button>
        </div>
      </dialog>
    );
  },
);

export default ConfirmDialog;
