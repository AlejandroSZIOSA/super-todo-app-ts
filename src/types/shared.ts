export type Todo = {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  deadline?: string;
};

export type Language = "en" | "sv" | "es";

export type Theme = "default" | "ocean";

export type RemainDaysBeforeWarning = 3 | 6 | 9;
