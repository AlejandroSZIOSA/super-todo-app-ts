import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import styles from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
  // Define any p title?: string;
  operation?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export type ConfirmDialogRef = {
  onOpenDialog: () => void;
  onCloseDialog: () => void;
};

const ConfirmDialog = forwardRef<ConfirmDialogRef, ConfirmDialogProps>(
  ({ operation, onConfirm, onCancel }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      onOpenDialog: () => dialogRef.current?.showModal(),
      onCloseDialog: () => dialogRef.current?.close(),
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

    let content: ReactNode;
    if (operation === "remove") {
      content = (
        <>
          <h1>Confirm Removal</h1>
          <p>Are you sure you want to remove this item?</p>
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
            Confirm
          </button>
        </div>
      </dialog>
    );
  },
);

export default ConfirmDialog;
