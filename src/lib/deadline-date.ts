const DAY_MS = 1000 * 60 * 60 * 24;
const NEPAL_TZ = "+05:45";

/** Calendar YYYY-MM-DD in Asia/Kathmandu (not UTC). Fixes `toISOString().slice(0,10)` shifting Nepal midnights to the previous UTC day. */
export const formatYmdInNepal = (d: Date): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);

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
