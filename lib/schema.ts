import { z } from "zod";

export const baggageSchema = z.object({
  cabinBaggage: z.boolean().default(false),
  checkedBaggage: z.boolean().default(false),
});

export type Baggage = z.infer<typeof baggageSchema>;

export const passengerCategories = ["adult", "child", "infant"];

const passengerCategory = z.enum(passengerCategories as [string, ...string[]]);

export const passengerSchema = z.object({
  id: z.number(),
  category: passengerCategory,
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(
      /^[a-zA-Z\s-]+$/,
      "Name can only contain letters, spaces, and hyphens"
    )
    .transform((name) => name.trim()), // Remove leading/trailing spaces
  dateOfBirth: z.string().nullable(),
  frequentFlyerNumber: z.string().optional(),
  baggage: baggageSchema.optional(),
});

export type PassengerCategory = z.infer<typeof passengerCategory>;
export type Passenger = z.infer<typeof passengerSchema>;
