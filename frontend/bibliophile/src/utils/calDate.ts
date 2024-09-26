export const calculateDaysSince = (date: string): number => {
  const startDate = new Date(date);
  const today = new Date();

  const timeDifference = today.getTime() - startDate.getTime();

  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

export const formatDate = (date: string): string => {
  const datePart = date.split(" ")[0];
  return datePart.replace(/-/g, "/");
};

export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};
