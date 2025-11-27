import { useState } from "react";
/* import { Item } from "../store/itemsSlice"; */

interface Props {
  initialValues: Partial<Item>;
  onSubmit: (values: Omit<Item, "id"> | Item) => void;
  submitLabel: string;
}

export default function TodoForm({
  initialValues,
  onSubmit,
  submitLabel,
}: Props) {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [description, setDescription] = useState(
    initialValues.description ?? ""
  );

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
}
