import { useState, type FC, useEffect } from "react";
/* import { Item } from "../store/itemsSlice"; */
import type { Todo, Priority } from "../../types/shared";
import { getCurrentDate } from "../../utils/calculations";

import useMediaQuery, { RESOLUTIONS } from "../../hooks/useMediaQuery";

import styles from "./TodoForm.module.css";

interface TodoFormProps {
  initialValues: Partial<Todo>;
  onSubmit: (values: Omit<Todo, "id"> | Todo) => void;
  operation?: "create" | "edit";
  submitBtnLabel: "Add" | "Edit" | "Save";
}

const TodoForm: FC<TodoFormProps> = ({
  initialValues,
  onSubmit,
  operation,
  submitBtnLabel,
}) => {
  const [formData, setFormData] = useState<Omit<Todo, "id" | "isComplete">>({
    title: initialValues.title ?? "",
    description: initialValues.description ?? "",
    priority: initialValues.priority ?? "low",
    deadline: initialValues.deadline ?? getCurrentDate(),
  });

  const isMobile = useMediaQuery(RESOLUTIONS.DESKTOP_BREAKPOINT); // Adjust the breakpoint as needed

  //fix problem send edited values
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
  }, [initialValues, operation]);

  //1-Pass the object after validate the form fields
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //fixed: using guards :)
    if (operation === "create") {
      onSubmit({
        ...(initialValues.id ? { id: initialValues.id } : {}),
        ...formData,
        priority: formData.priority ?? "low",
        isComplete: false,
      });
      setFormData({
        ...TodoForm,
        title: "",
        description: "",
        deadline: getCurrentDate(),
        priority: "low",
      });
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            defaultValue={getCurrentDate()}
            min={getCurrentDate()}
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            required
          />
        </div>

        {!isMobile && (
          <>
            <label htmlFor="priority">Priority</label>
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
          </>
        )}

        {(operation === "create" || operation === "edit") && isMobile && (
          <div className={styles.priorityContainer}>
            <label>Priority</label>
            <div>
              <div>
                <label>
                  <input
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
                  Low
                </label>
              </div>
              <div>
                <label>
                  <input
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
                  Medium
                </label>
              </div>
              <div>
                <label>
                  <input
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
                  High
                </label>
              </div>
            </div>
            <br />
          </div>
        )}

        <button id="btn-add-todo" type="submit">
          {submitBtnLabel}
        </button>
      </form>
    </>
  );
};
export default TodoForm;
