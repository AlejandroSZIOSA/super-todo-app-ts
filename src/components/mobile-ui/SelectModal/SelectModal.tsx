import { useState, type FC } from "react";
import styles from "./SelectModal.module.css";

const SelectModal: FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("JavaScript");

  const options = ["JavaScript", "Python", "Java"];

  return (
    <>
      <button className={styles.selectBtn} onClick={() => setOpen(true)}>
        {value}
      </button>

      {open && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setValue(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectModal;
