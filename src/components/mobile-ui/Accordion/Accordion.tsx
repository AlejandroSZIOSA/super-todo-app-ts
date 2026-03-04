import { type FC, useState } from "react";
import styles from "./Accordion.module.css";

type AccordionProps = {
  description?: string;
  isDone: boolean;
  title: string;
};

const Accordion: FC<AccordionProps> = ({ title, description, isDone }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <menu className={styles.menu}>
      <h3 onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        {isDone ? (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        ) : (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        )}
      </h3>
      {isOpen && (
        <div className={styles.content}>
          <p>{description}</p>
        </div>
      )}
    </menu>
  );
};

export default Accordion;
