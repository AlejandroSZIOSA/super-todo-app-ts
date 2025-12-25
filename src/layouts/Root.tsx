import { type FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const RootLayout: FC = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export default RootLayout;
