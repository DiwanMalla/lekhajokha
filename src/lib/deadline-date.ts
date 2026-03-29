const DAY_MS = 1000 * 60 * 60 * 24;
const NEPAL_TZ = "+05:45";

export const parseDeadlineDate = (yyyyMmDd: string, endOfDay = false): Date => {
  const time = endOfDay ? "23:59:59" : "00:00:00";
  return new Date(`${yyyyMmDd}T${time}${NEPAL_TZ}`);
};

export const daysUntilDeadline = (
  yyyyMmDd: string,
  now = new Date(),
): number => {
  const dueEndOfDay = parseDeadlineDate(yyyyMmDd, true).getTime();
  return Math.ceil((dueEndOfDay - now.getTime()) / DAY_MS);
};

export const isOverdue = (yyyyMmDd: string, now = new Date()): boolean =>
  parseDeadlineDate(yyyyMmDd, true).getTime() < now.getTime();
