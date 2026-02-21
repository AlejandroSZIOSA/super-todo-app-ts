import { useState, type FC, useEffect } from "react";
/* import { Item } from "../store/itemsSlice"; */
import { type Todo } from "../../types/shared";
import { getCurrentDate } from "../../utils/calculations";

/* type InitialValues = Partial<Todo>; */

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
    deadline: initialValues.deadline ?? getCurrentDate(),
  });

  //fix problem send edited values
  useEffect(() => {
    //re-render the component when the initialValues change
    if (operation === "edit") {
      const { title, description, deadline } = initialValues;
      setFormData({
        title: title ?? "",
        description: description ?? "",
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
        isComplete: false,
      });
      setFormData({
        title: "",
        description: "",
        deadline: getCurrentDate(),
      });
    } else if (operation === "edit") {
      onSubmit({
        ...(initialValues.id ? { id: initialValues.id } : {}),
        ...formData,
        isComplete: initialValues.isComplete ?? false,
      });
      setFormData({
        title: "",
        description: "",
        deadline: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
      <button id="btn-add-todo" type="submit">
        {submitBtnLabel}
      </button>
    </form>
  );
};
export default TodoForm;
