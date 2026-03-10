import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import styles from "./ConfirmDialog.module.css";

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
          <h1>Confirm Remove</h1>
          <p>Remove todo title: {todoTitle}?</p>
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
