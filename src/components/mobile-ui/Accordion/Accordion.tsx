import { type FC, useState } from "react";
import styles from "./Accordion.module.css";

type AccordionProps = {
  description?: string;
  isDone: boolean;
  title: string;
};

const Accordion: FC<AccordionProps> = ({ title, description, isDone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <menu className={styles.menu}>
      <li onClick={toggleAccordion}>
        <span>{title}</span>
        {isDone ? (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        ) : (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        )}
      </li>
      {isOpen && (
        <div className={styles.content}>
          <p>{description}</p>
        </div>
      )}
    </menu>
  );
};

export default Accordion;
