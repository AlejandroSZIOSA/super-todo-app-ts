import { useState, type FormEvent, type FC } from "react";
/* import { Item } from "../store/itemsSlice"; */
import { type Todo } from "../types/shared";

interface TodoFormProps {
  initialValues: Partial<Todo>;
  onSubmit: (values: Omit<Todo, "id"> | Todo) => void;
  submitLabel: "Create" | "Update";
}

const TodoForm: FC<TodoFormProps> = ({
  initialValues,
  onSubmit,
  submitLabel,
}) => {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [description, setDescription] = useState(
    initialValues.description ?? ""
  );

  const handleSubmit = (e: FormEvent) => {
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
