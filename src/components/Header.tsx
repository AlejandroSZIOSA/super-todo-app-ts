import { type FC } from "react";

import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header>
      {/*       Fix Redux Problem
       */}{" "}
      <Link to="/">Home</Link>
      <Link to="/organize">Organize</Link>
    </header>
  );
};

export default Header;
