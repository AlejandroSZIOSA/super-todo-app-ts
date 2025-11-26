import { type FC } from "react";

const Header: FC = () => {
  return (
    <header>
      <a href="/">Home</a>
      <a href="/organize">Organize</a>
      <a href="/settings">Settings</a>
    </header>
  );
};

export default Header;
