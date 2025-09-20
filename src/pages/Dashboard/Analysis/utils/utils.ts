import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export function fixedZero(val: number): string | number {
  return val < 10 ? `0${val}` : val;
}

export type TimeRangeType = "today" | "week" | "month" | "year";

export const getTimeDistance = (type: TimeRangeType): [Dayjs, Dayjs] => {
  const now = dayjs();

  switch (type) {
    case "today": {
      const start = now.startOf("day");
      return [start, now];
    }

    case "week": {
      const dayOfWeek = now.day() || 7;
      const startOfWeek = now.subtract(dayOfWeek - 1, "day").startOf("day");
      return [startOfWeek, now];
    }

    case "month": {
      const startOfMonth = now.startOf("month");
      return [startOfMonth, now];
    }

    case "year": {
      const startOfYear = now.startOf("year");
      return [startOfYear, now];
    }

    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Unexpected time range type: ${exhaustiveCheck}`);
  }
};

/**
 * 判断给定的时间范围是否完全匹配 today、week、month 或 year 中的某一个预设范围
 * @param range 要判断的时间范围 [start, end]
 * @returns 匹配的预设类型，如不匹配则返回 null
 */
export const isTimeRangeInPreset = (
  range: [Dayjs, Dayjs]
): TimeRangeType | null => {
  const [rangeStart, rangeEnd] = range;

  // 检查是否为今天
  const todayRange = getTimeDistance("today");
  if (
    rangeStart.isSame(todayRange[0], "second") &&
    rangeEnd.isSame(todayRange[1], "second")
  ) {
    return "today";
  }

  // 检查是否为本周
  const weekRange = getTimeDistance("week");
  if (
    rangeStart.isSame(weekRange[0], "second") &&
    rangeEnd.isSame(weekRange[1], "second")
  ) {
    return "week";
  }

  // 检查是否为本月
  const monthRange = getTimeDistance("month");
  if (
    rangeStart.isSame(monthRange[0], "second") &&
    rangeEnd.isSame(monthRange[1], "second")
  ) {
    return "month";
  }

  // 检查是否为本年
  const yearRange = getTimeDistance("year");
  if (
    rangeStart.isSame(yearRange[0], "second") &&
    rangeEnd.isSame(yearRange[1], "second")
  ) {
    return "year";
  }

  return null;
};
