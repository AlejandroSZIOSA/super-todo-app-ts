import { type FC } from "react";

import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";

import type { ComponentType, SVGProps } from "react";
import { HomeIcon, OrganizeIcon, SettingsIcon } from "../../assets/icons";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  {
    to: "/",
    label: "Home",
    icon: HomeIcon as ComponentType<SVGProps<SVGSVGElement>>,
  },
  {
    to: "/organize",
    label: "Organize",
    icon: OrganizeIcon as ComponentType<SVGProps<SVGSVGElement>>,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: SettingsIcon as ComponentType<SVGProps<SVGSVGElement>>,
  },
];

const NavBar: FC = () => {
  return (
    <nav className={styles.nav}>
      {/* Icon is a Component :) */}
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <Icon className={styles.icon} />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
