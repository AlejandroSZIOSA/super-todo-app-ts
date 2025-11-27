import { type FC } from "react";
import { type Todo } from "../../types/shared";

interface CardViewProps {
  todo?: Todo;
  variant?: "home" | "organize";
}

const CardView: FC<CardViewProps> = ({ todo, variant }) => {
  // const counter = useAppSelector((state) => state.counter.value);
  return (
    <>
      {variant === "home" ? (
        <div>
          <p>card view home</p> <p>{todo?.title}</p>
        </div>
      ) : null}
    </>
  );
};

export default CardView;
