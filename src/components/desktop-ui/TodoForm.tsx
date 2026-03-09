import { useState, type FC, useEffect } from "react";
/* import { Item } from "../store/itemsSlice"; */
import type { Todo, Priority } from "../../types/shared";
import { getCurrentDate } from "../../utils/calculations";

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
        priority: formData.priority ?? "low", //changed
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

        {operation === "create" && (
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

        <button id="btn-add-todo" type="submit">
          {submitBtnLabel}
        </button>
      </form>
    </>
  );
};
export default TodoForm;
