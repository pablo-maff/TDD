const millisPerDay = 24 * 60 * 60 * 1000;

// * Reading the current time is untestable.
// TODO: 1. Pass now as the function parameter DONE
// TODO: 2. Replace new Date passed as argument of christmasDay.setFullYear with the parameter now DONE
export function daysUntilChristmas(now) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(now.getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
