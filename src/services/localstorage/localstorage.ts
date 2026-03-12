import type { Language, Theme, DaysCountdown } from "../../types/shared";

export type Settings = {
  language: Language;
  daysCountdown: DaysCountdown;
  theme: Theme;
};

const SETTING_KEY = "settings";

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
