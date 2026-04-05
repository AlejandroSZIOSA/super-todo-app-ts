import { type FC, useState } from "react";
import styles from "./Accordion.module.css";

type AccordionProps = {
  description?: string;
  isDone: boolean;
  isExpired: boolean;
  title: string;
};

const Accordion: FC<AccordionProps> = ({
  title,
  description,
  isDone,
  isExpired,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <menu className={styles.menu}>
      <p onClick={() => setIsOpen(!isOpen)}>
        <span
          className={isDone ? styles.isDone : isExpired ? styles.isDone : ""}
        >
          {title}
        </span>
        {isDone || isExpired ? (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        ) : (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        )}
      </p>
      {isOpen && (
        <div className={styles.content}>
          <p
            className={isDone ? styles.isDone : isExpired ? styles.isDone : ""}
          >
            {description}
          </p>
        </div>
      )}
    </menu>
  );
};

export default Accordion;
