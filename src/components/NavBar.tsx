import { type FC } from "react";

import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/organize", label: "Organize" },
  { to: "/settings", label: "Settings" },
];

const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <p>icon</p>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
