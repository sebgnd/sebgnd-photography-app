export type DateRange = {
  first: Date,
  last: Date,
};

export const isDateInRange = (date: Date, range: DateRange) => {
  const { first, last } = range;
  const isBeforeFirst = date.getTime() < first.getTime();
  const isAfterLast = date.getTime() > last.getTime();

  return !isBeforeFirst && isAfterLast;
};
