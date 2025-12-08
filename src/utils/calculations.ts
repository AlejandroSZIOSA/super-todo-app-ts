export function countRemainingDays(
  currentDate: Date,
  deadline?: string
): number {
  const current = new Date(currentDate);
  //gard condition
  if (!deadline) {
    return 0; // No deadline provided
  }
  const target = new Date(deadline);

  // Calculate the difference in time (milliseconds)
  const timeDifference = target.getTime() - current.getTime();

  // Convert the difference to days
  //ceil() fn to round up to the nearest whole number
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // milliseconds to days
  return remainingDays;
}
