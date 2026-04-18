import { type FC, useState } from "react";
import styles from "./Accordion.module.css";

type AccordionProps = {
  description?: string;
  isDone: boolean;
  isExpired: boolean;
  title: string;
  variant: "edit" | "home";
};

const Accordion: FC<AccordionProps> = ({
  title,
  description,
  isDone,
  isExpired,
  variant,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <menu
      className={`${styles.menu} ${variant === "home" ? styles.home : variant === "edit" ? styles.edit : ""}`}
    >
      <p onClick={() => setIsOpen(!isOpen)}>
        <span
          className={isDone ? styles.isDone : isExpired ? styles.isDone : ""}
        >
          {title}
        </span>
        {isDone || isExpired ? (
          <span>
            <strong>{isOpen ? " (-)" : " (+)"}</strong>
          </span>
        ) : (
          <span>
            <strong>{isOpen ? " (-)" : " (+)"}</strong>
          </span>
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
