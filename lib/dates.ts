import { differenceInYears, format } from "date-fns";

export const calculateAgeInYears = (date: Date | null) => {
  if (!date) return null;

  return differenceInYears(new Date(), date);
};

export const formatDate = (date: Date | null) => {
  if (!date) return null;

  return format(date, "yyyy-MM-dd");
};
