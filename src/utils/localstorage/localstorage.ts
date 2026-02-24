import type { Language, Theme, DaysCountdown } from "../../types/shared";

export type Settings = {
  language: Language;
  daysCountdown: DaysCountdown;
  theme: Theme;
};

const SETTING_KEY = "settings";

//warning  days
/* export const loadDaysRemainingCounter = (): DaysCountdown => {
  try {
    const data = localStorage.getItem(REMAIN_DAYS_WARNING_KEY);
    return data ? (JSON.parse(data) as DaysCountdown) : 3;
  } catch {
    return 3;
  }
};

export const saveDaysRemainingCounter = (daysRemaining: DaysCountdown) => {
  try {
    localStorage.setItem(
      REMAIN_DAYS_WARNING_KEY,
      JSON.stringify(daysRemaining),
    );
  } catch {
    // ignore write errors
    return 3;
  }
}; */

//theme
/* export const loadTheme = (): Theme => {
  try {
    const data = localStorage.getItem(THEME_KEY);
    return data ? (JSON.parse(data) as Theme) : "default";
  } catch {
    return "default";
  }
};

export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch {
    // ignore write errors
  }
}; */

//Settings
export const loadSettings = (): Settings => {
  try {
    const data = localStorage.getItem(SETTING_KEY);
    return data
      ? (JSON.parse(data) as Settings)
      : { language: "en", theme: "default", daysCountdown: 3 };
  } catch {
    return { language: "en", theme: "default", daysCountdown: 3 };
  }
};

export const saveSettings = (settings: Settings) => {
  try {
    localStorage.setItem(SETTING_KEY, JSON.stringify(settings));
  } catch {
    // ignore write errors
  }
};
