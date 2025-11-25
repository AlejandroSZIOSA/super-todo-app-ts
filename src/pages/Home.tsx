import { type FC } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

const HomePage: FC = () => {
  return (
    <div>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>home page</h1>
    </div>
  );
};

export default HomePage;
