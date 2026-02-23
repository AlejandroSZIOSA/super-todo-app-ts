import type { Language, Theme, DaysCountdown } from "../../types/shared";

//The browser is using this keys to store data in localstorage
const LANGUAGE_KEY = "languages";
const REMAIN_DAYS_WARNING_KEY = "countdown-days-bef-warning";
const THEME_KEY = "theme";

//language
export const loadLanguage = (): Language => {
  try {
    const data = localStorage.getItem(LANGUAGE_KEY);
    return data ? (JSON.parse(data) as Language) : "en";
  } catch {
    return "en";
  }
};

export const saveLanguage = (language: Language) => {
  try {
    localStorage.setItem(LANGUAGE_KEY, JSON.stringify(language));
  } catch {
    // ignore write errors
  }
};

//warning  days
export const loadDaysRemainingCounter = (): DaysCountdown => {
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
};

//theme
export const loadTheme = (): Theme => {
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
};
