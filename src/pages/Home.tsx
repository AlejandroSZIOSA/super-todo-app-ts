import { type FC } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import TodosList from "../components/List";

import { type Todo } from "../types/shared";

import type { RootState, AppDispatch } from "../store/redux/store";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import {
  increment,
  decrement,
  incrementByAmount,
} from "../store/redux/counterSlice";
import CardView from "../components/mobile-ui/CardView";

const HomePage: FC = () => {
  //
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // const todosRedux = useSelector((state: RootState) => state.todos);

  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <img src={viteLogo} className="logo" alt="Vite logo" />
      {/*   <h1>{counter}</h1> */}
      <CardView />
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      {/* <button onClick={handleAddTodo}>Add todo </button>
      <TodosList list={todosRedux as Todo[]} /> */}
    </>
  );
};

export default HomePage;
