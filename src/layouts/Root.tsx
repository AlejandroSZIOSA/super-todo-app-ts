import { type FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar/NavBar";

const RootLayout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <NavBar />
    </>
  );
};

export default RootLayout;
