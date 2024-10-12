export const calculateDaysSince = (date: string): number => {
  const startDate = new Date(date);
  const today = new Date();

  const timeDifference = today.getTime() - startDate.getTime();

  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

export const formatDate = (date: string): string => {
  return date.slice(0, 10);
};
