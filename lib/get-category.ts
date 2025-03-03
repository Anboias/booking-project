import { PassengerCategory } from "./schema";

const AGE_LIMITS: Record<PassengerCategory, number[]> = {
  infant: [0, 3],
  child: [3, 17],
  adult: [18, 100],
};

export const getAppropriateCategoryByAge = (date: Date | null) => {
  const age = calculateAgeInYears(date);
  if (age === null) return null;

  return Object.entries(AGE_LIMITS).find(
    ([_, [from, to]]) => age >= from && age <= to
  )?.[0] as PassengerCategory;
};

const calculateAgeInYears = (date: Date | null) => {
  if (!date) return null;

  const ageDiff = new Date().getFullYear() - date.getFullYear();
  return ageDiff;
};
