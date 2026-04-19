import { type Task } from "../types/shared";

const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1,
} as const;

export const localDate = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate;
};

export function countRemainingDays(deadline: string): number {
  /*  const date = new Date();
  const offset = date.getTimezoneOffset();
  const currentDate = new Date(date.getTime() - offset * 60 * 1000); */
  const currentDate = localDate();
  const target = new Date(deadline);
  // Calculate the difference in time (milliseconds)
  const timeDifference = target.getTime() - currentDate.getTime();
  // Convert the difference to days
  //ceil() fn to round up to the nearest whole number
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // milliseconds to days
  return remainingDays;
}

/* export const getCurrentDateInput = () => new Date().toISOString().split("T")[0];
 */
export const getCurrentDateInput = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
};

// This function is used to sort the todos by priority and deadline, it is used in the Home page to sort the todos before rendering them, it is also used in the CardEdit component to sort the todos before rendering them in the accordion component.
export const sortedTodosFn = (todos: Task[]): Task[] =>
  [...todos].sort((a, b) => {
    // First, sort by priority (higher priority first)
    if (a.priority !== b.priority) {
      const priorityB =
        PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] ?? 0;
      const priorityA =
        PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] ?? 0;
      return priorityB - priorityA;
    }
    // Then, sort by deadline (nearest deadline first)
    const deadlineA = new Date(a.deadline).getTime();
    const deadlineB = new Date(b.deadline).getTime();
    return deadlineA - deadlineB;
  });

export type DateLanguages = "en-US" | "es-ES" | "sv-SE";
export const getDateDifferentLanguage = (language: DateLanguages): string => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return date.toLocaleDateString(language, options);
};
