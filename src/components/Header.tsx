import { type FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <header>
      {/*       Fix Redux Problem using Links Component instead anchor Tags
       */}
      <Link to="/">Home</Link>
      <Link to="/organize">Organize</Link>
      {/* <Link to="/settings">Settings</Link> */}
    </header>
  );
};

export default Header;
