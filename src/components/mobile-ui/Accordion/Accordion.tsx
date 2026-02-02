import { type FC, useState } from "react";

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
    <ul>
      <li onClick={toggleAccordion}>
        <span>{title}</span>
        {isDone ? (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        ) : (
          <span>{isOpen ? "(-)" : "(+)"}</span>
        )}
      </li>
      {isOpen && (
        <div>
          <p>{description}</p>
        </div>
      )}
    </ul>
  );
};

export default Accordion;
