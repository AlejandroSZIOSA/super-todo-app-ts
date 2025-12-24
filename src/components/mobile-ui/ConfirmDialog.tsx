import { useRef, forwardRef, useImperativeHandle } from "react";
import classes from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
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
    ref
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
      <dialog ref={dialogRef} className={classes.confirmDialogContainer}>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className={classes.buttonContainer}>
          <button onClick={handleCancel} className={classes.buttonCancel}>
            Cancel
          </button>
          <button onClick={handleConfirm} className={classes.buttonConfirm}>
            Confirm
          </button>
        </div>
      </dialog>
    );
  }
);

export default ConfirmDialog;
