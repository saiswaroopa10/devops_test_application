import { describe, expect, it } from 'vitest';
import { calculateDuration, formatDuration } from './duration';

describe('calculateDuration', () => {
  it('calculates years, months, and days across month boundaries', () => {
    const start = new Date(2022, 5, 2);
    const end = new Date(2024, 7, 1);
    expect(calculateDuration(start, end)).toEqual({
      years: 2,
      months: 1,
      days: 30,
    });
  });

  it('formats duration labels', () => {
    expect(formatDuration({ years: 1, months: 1, days: 1 })).toBe(
      '1 year, 1 month, and 1 day',
    );
    expect(formatDuration({ years: 2, months: 3, days: 4 })).toBe(
      '2 years, 3 months, and 4 days',
    );
  });
});
