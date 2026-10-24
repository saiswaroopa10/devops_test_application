export interface Duration {
  years: number;
  months: number;
  days: number;
}

/**
 * Calculates years, months, and days between startDate and endDate.
 * Handles calendar months correctly (not fixed 30-day months).
 */
export function calculateDuration(startDate: Date, endDate: Date = new Date()): Duration {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  if (end < start) {
    return { years: 0, months: 0, days: 0 };
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function formatDuration(duration: Duration): string {
  const yearLabel = duration.years === 1 ? 'year' : 'years';
  const monthLabel = duration.months === 1 ? 'month' : 'months';
  const dayLabel = duration.days === 1 ? 'day' : 'days';
  return `${duration.years} ${yearLabel}, ${duration.months} ${monthLabel}, and ${duration.days} ${dayLabel}`;
}
