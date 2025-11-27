import { type FC } from "react";
import { type Todo } from "../../types/shared";

interface CardViewProps {
  todo: Todo;
  variant?: "home" | "organize";
}

const CardView: FC<CardViewProps> = ({ todo, variant }) => {
  // const counter = useAppSelector((state) => state.counter.value);

  //TODO: FIX HERE
  if (variant === "home") {
    return (
      <div>
        <h3>Todo - home view</h3>
        <p>{todo.title}</p>
        <p>{todo.description}</p>
        <div>
          <button>Is completed</button>
          <button>Delete</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>Todo - organize view</h3>
      <p>{todo.title}</p>
      <p>{todo.description}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default CardView;
