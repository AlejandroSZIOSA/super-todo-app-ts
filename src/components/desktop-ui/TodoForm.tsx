import { useState, type FC, useEffect } from "react";
/* import { Item } from "../store/itemsSlice"; */
import { type Todo } from "../../types/shared";
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
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [description, setDescription] = useState(
    initialValues.description ?? "",
  );
  const [deadline, setDeadline] = useState(initialValues.deadline ?? "");

  /* const [data, setData] = useState<Omit<Todo, "id">>({
    title: "",
    description: "",
    deadline: "",
    isComplete: false,
  }); */

  //fix problem send edited values
  useEffect(() => {
    //re-render the component when the initialValues change
    if (operation === "edit") {
      const { title, description } = initialValues;
      setTitle(title ?? "");
      setDescription(description ?? "");
      setDeadline(initialValues.deadline ?? "");
    }
  }, [initialValues, operation]);

  //1-Pass the object after validate the form fields
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...(initialValues.id ? { id: initialValues.id } : {}),
      title,
      description,
      deadline,
      isComplete: false, //default value when create a new todo
    });
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="deadline">Deadline</label>
        <input
          type="date"
          id="deadline"
          defaultValue={getCurrentDate()}
          min={getCurrentDate()}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <button id="btn-add-todo" type="submit">
        {submitBtnLabel}
      </button>
    </form>
  );
};
export default TodoForm;
