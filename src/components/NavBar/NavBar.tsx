import { type FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

import type { ComponentType, SVGProps } from "react";
import { HomeIcon, OrganizeIcon, SettingsIcon } from "../../assets/icons";

import { translations } from "../../data/translations";
import { useAppSelector } from "../../hooks/reduxHooks";
import { type RootState } from "../../store";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const NavBar: FC = () => {
  const settings = useAppSelector((state: RootState) => state.settings);

  const TRANSLATION = translations[settings.language];

  const navItems: NavItem[] = [
    {
      to: "/",
      label: `${TRANSLATION.navBar_T ? TRANSLATION.navBar_T.home : "Home"}`,
      icon: HomeIcon as ComponentType<SVGProps<SVGSVGElement>>,
    },
    {
      to: "/organize",
      label: `${TRANSLATION.navBar_T ? TRANSLATION.navBar_T.organize : "Edit"}`,
      icon: OrganizeIcon as ComponentType<SVGProps<SVGSVGElement>>,
    },
    {
      to: "/settings",
      label: `${TRANSLATION.navBar_T ? TRANSLATION.navBar_T.settings : "Settings"}`,
      icon: SettingsIcon as ComponentType<SVGProps<SVGSVGElement>>,
    },
  ];

  return (
    <nav className={styles.nav}>
      {/* Icon is a Component :) */}
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          /* ref={(el) => {
            linkRef.current[index] = el;
          }}
          onFocus={() => handleFocus(index)} */
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <Icon className={styles.icon} />
          <span className={styles.label}>
            <p>{label}</p>
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
