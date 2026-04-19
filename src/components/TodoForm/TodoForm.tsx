import { useState, type FC, useEffect, type ReactNode, useRef } from "react";
/* import { Item } from "../store/itemsSlice"; */
import type { Task, Priority } from "../../types/shared";
import { getCurrentDateInput } from "../../utils/calculations";
import { v4 as uuid } from "uuid"; //create unique ids max 4 values length

import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";

import styles from "./TodoForm.module.css";

import { useAppSelector } from "../../hooks/reduxHooks";
import { type RootState } from "../../store";
import { translations } from "../../data/translations";

interface TodoFormProps {
  initialValues: Partial<Task>;
  onSubmit: (values: Omit<Task, "id"> | Task) => void;
  operation?: "create" | "edit";
  submitBtnLabel: "Add" | "Edit" | "Save";
}

const TodoForm: FC<TodoFormProps> = ({
  initialValues,
  onSubmit,
  operation,
  submitBtnLabel,
}) => {
  const [formData, setFormData] = useState<
    Omit<Task, "id" | "isComplete"> | Task
  >({
    id: initialValues.id ?? "",
    title: initialValues.title ?? "",
    description: initialValues.description ?? "",
    priority: initialValues.priority ?? "low",
    deadline: initialValues.deadline ?? getCurrentDateInput(),
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT); // Adjust the breakpoint as needed

  //translations  en - swe as context param, this change the current language state
  const settings = useAppSelector((state: RootState) => state.settings);
  const TRANSLATION = translations[settings.language];
  const { todoForm_T } = TRANSLATION;

  //fixed: problem send edited values
  useEffect(() => {
    //re-render the component when the initialValues change
    if (operation === "edit") {
      const { title, description, priority, deadline } = initialValues;
      setFormData({
        title: title ?? "",
        description: description ?? "",
        priority: priority ?? "low",
        deadline: deadline ?? "",
      });
    }
    handleFocus();
  }, [initialValues, operation]);

  let btnTextContent: ReactNode;

  switch (submitBtnLabel) {
    case "Add":
      btnTextContent = todoForm_T ? todoForm_T.add : "Add";
      break;
    case "Edit":
      btnTextContent = todoForm_T ? todoForm_T.edit : "Edit";
      break;
    case "Save":
      btnTextContent = todoForm_T ? todoForm_T.edit : "Save";
      break;
    default:
      btnTextContent = submitBtnLabel;
  }

  //1-Pass the object after validate the form fields
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //fixed: using guards :)
    if (operation === "create") {
      onSubmit({
        /* ...(initialValues.id ? { id: initialValues.id } : {}), */
        ...formData,
        id: uuid().replace(/-/g, "").slice(0, 3),
        priority: formData.priority ?? "low",
        isComplete: false,
      });
      setFormData({
        ...TodoForm,
        title: "",
        description: "",
        deadline: getCurrentDateInput(),
        priority: "low",
      });
      handleFocus();
    } else if (operation === "edit") {
      onSubmit({
        ...(initialValues.id ? { id: initialValues.id } : {}),
        ...formData,
        isComplete: initialValues.isComplete ?? false,
      });
      setFormData({
        ...TodoForm,
        title: "",
        description: "",
        deadline: "",
        priority: "low",
      });
      handleFocus();
    }
  };

  const handleFocus = () => {
    //fix with guards
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.inputsTextContainer}>
        <label htmlFor="title">{todoForm_T ? todoForm_T.title : "Title"}</label>
        <input
          id="title"
          value={formData.title}
          placeholder={
            todoForm_T ? todoForm_T.title.toLocaleLowerCase() : "title"
          }
          maxLength={28}
          ref={inputRef}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className={styles.inputsTextContainer}>
        <label htmlFor="description">
          {todoForm_T ? todoForm_T.description : "Description"}
        </label>
        <textarea
          id="description"
          value={formData.description}
          placeholder={
            todoForm_T
              ? todoForm_T.description.toLocaleLowerCase()
              : "description"
          }
          maxLength={120}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div className={styles.deadlineContainer}>
        <label htmlFor="deadline">
          {todoForm_T ? todoForm_T.deadline : "Deadline"}
        </label>
        <input
          type="date"
          id="deadline"
          min={getCurrentDateInput()}
          value={formData.deadline}
          onChange={(e) =>
            setFormData({ ...formData, deadline: e.target.value })
          }
          required
        />
      </div>

      {!isMobile && (
        <div className={styles.priorityDesktopContainer}>
          <label htmlFor="priority">
            {todoForm_T ? todoForm_T.priority : "Priority"}
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value as Priority,
              })
            }
            required
          >
            <option disabled>Choose priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <br />
        </div>
      )}

      {(operation === "create" || operation === "edit") && isMobile && (
        <div className={styles.priorityContainer}>
          <label>{todoForm_T ? todoForm_T.priority : "Priority"}</label>
          <div>
            <div>
              <label>
                <input
                  className={styles.priorityRadioContainers}
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === "low"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as Priority,
                    })
                  }
                />
                {todoForm_T ? todoForm_T.low : "Low"}
              </label>
            </div>
            <div>
              <label>
                <input
                  className={styles.priorityRadioContainers}
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === "medium"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as Priority,
                    })
                  }
                />
                {todoForm_T ? todoForm_T.medium : "Medium"}
              </label>
            </div>
            <div>
              <label>
                <input
                  className={styles.priorityRadioContainers}
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === "high"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as Priority,
                    })
                  }
                />
                {todoForm_T ? todoForm_T.high : "High"}
              </label>
            </div>
          </div>
          <br />
        </div>
      )}
      <div className={styles.submitBtnContainer}>
        <button id="btn-add-todo" type="submit">
          {btnTextContent}
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
