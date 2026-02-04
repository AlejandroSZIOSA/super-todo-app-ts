import type { Todo, Language, Theme } from "../../types/shared";

//The browser is using this keys to store data in localstorage
const TODOS_KEY = "todo-list";
const LANGUAGE_KEY = "languages";
const REMAIN_DAYS_WARNING_KEY = "countdown-days-bef-warning";
const THEME_KEY = "theme";

//todos
export const loadTodos = (): Todo[] => {
  try {
    const data = localStorage.getItem(TODOS_KEY);
    return data ? (JSON.parse(data) as Todo[]) : [];
  } catch {
    return [];
  }
};

export const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch {
    // ignore write errors
  }
};

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
export const loadDaysRemainingCounter = (): number => {
  try {
    const data = localStorage.getItem(REMAIN_DAYS_WARNING_KEY);
    return data ? (JSON.parse(data) as number) : 0;
  } catch {
    return 0;
  }
};

export const saveDaysRemainingCounter = (daysRemaining: number) => {
  try {
    localStorage.setItem(
      REMAIN_DAYS_WARNING_KEY,
      JSON.stringify(daysRemaining),
    );
  } catch {
    // ignore write errors
    return 0;
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

export const saveTheme = (theme: string) => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch {
    // ignore write errors
  }
};
