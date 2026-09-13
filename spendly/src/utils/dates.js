export function parseLocalDate(
  dateString
) {
  const [
    year,
    month,
    day
  ] = dateString
    .split('-')
    .map(Number);

  return new Date(
    year,
    month - 1,
    day
  );
}

export function isToday(
  dateString
) {
  const date =
    parseLocalDate(dateString);

  const today =
    new Date();

  return (
    date.getFullYear() ===
      today.getFullYear() &&
    date.getMonth() ===
      today.getMonth() &&
    date.getDate() ===
      today.getDate()
  );
}

export function isCurrentWeek(
  dateString
) {
  const date =
    parseLocalDate(dateString);

  const today =
    new Date();

  /*
    getDay():
    dimanche = 0
    lundi    = 1
    ...
    samedi   = 6
  */

  const day =
    today.getDay();

  /*
    On considère ici que
    la semaine commence lundi.
  */
  const daysSinceMonday =
    day === 0
      ? 6
      : day - 1;

  const startOfWeek =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() -
        daysSinceMonday
    );

  startOfWeek.setHours(
    0,
    0,
    0,
    0
  );

  const endOfWeek =
    new Date(startOfWeek);

  endOfWeek.setDate(
    startOfWeek.getDate() + 6
  );

  endOfWeek.setHours(
    23,
    59,
    59,
    999
  );

  return (
    date >= startOfWeek &&
    date <= endOfWeek
  );
}

export function isCurrentMonth(
  dateString
) {
  const date =
    parseLocalDate(dateString);

  const today =
    new Date();

  return (
    date.getFullYear() ===
      today.getFullYear() &&
    date.getMonth() ===
      today.getMonth()
  );
}

export function isCurrentYear(
  dateString
) {
  const date =
    parseLocalDate(dateString);

  const today =
    new Date();

  return (
    date.getFullYear() ===
    today.getFullYear()
  );
}