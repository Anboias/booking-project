import { Baggage, PassengerCategory } from "./schema";

export type PricingType = PassengerCategory | keyof Baggage;
export const currency = "€";

const PRICE_TABLE: Record<PricingType, number> = {
  infant: 50,
  child: 75,
  adult: 100,
  cabinBaggage: 10,
  checkedBaggage: 20,
};

export const getPrice = (type: PricingType) => {
  return PRICE_TABLE[type];
};
