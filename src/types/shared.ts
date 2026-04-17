export type Todo = {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  priority: "low" | "medium" | "high";
  deadline: string;
};

//dialog types
export type ConfirmDialogData = {
  id?: number | null;
  title: string;
  operation: string;
};

//languages types
export type Language = "en" | "sv" | "es";

//theme
export type Theme = "default" | "ocean";

//countdown days remainder
export type DaysCountdown = 2 | 3 | 4 | 6 | 9 | 14;

export type Priority = "low" | "medium" | "high";
