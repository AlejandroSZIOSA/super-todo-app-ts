import { useState, type FC, useEffect } from "react";
/* import { Item } from "../store/itemsSlice"; */
import { type Todo } from "../types/shared";

interface TodoFormProps {
  initialValues: Partial<Todo>;
  onSubmit: (values: Omit<Todo, "id"> | Todo) => void;
  operation?: "create" | "edit";
  submitLabel: "Create" | "Edit";
}

const TodoForm: FC<TodoFormProps> = ({
  initialValues,
  onSubmit,
  operation,
  submitLabel,
}) => {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [description, setDescription] = useState(
    initialValues.description ?? ""
  );

  //fix problem send edited values
  useEffect(() => {
    if (operation === "edit") {
      const { title, description } = initialValues;
      setTitle(title ?? "");
      setDescription(description ?? "");
    }
  }, [initialValues, operation]);

  //1-Pass the object after validate the form fields
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...(initialValues.id ? { id: initialValues.id } : {}),
      title,
      description,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">{submitLabel}</button>
    </form>
  );
};
export default TodoForm;
