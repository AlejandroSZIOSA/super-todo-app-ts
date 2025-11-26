import { type FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
