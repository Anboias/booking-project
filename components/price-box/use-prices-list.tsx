'use client'

import { Passenger } from "@/lib/schema";
import { getPrice, PricingType } from "@/lib/get-price";
import { useEffect } from "react";
import { useState } from "react";

export type PriceEntry = {
    type: PricingType;
    number: number;
}

export const usePricesList = (passengers: Partial<Passenger>[]) => {
    const [pricesList, setPricesList] = useState<PriceEntry[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const prices = getPricesList(passengers);
        const total = getTotal(prices.map(price => price.number));

        setPricesList(prices);
        setTotalAmount(total);
    }, [passengers]);

    return { pricesList, totalAmount };
};

const getPricesList = (passengers: Partial<Passenger>[]) => {
    const pricesList: PriceEntry[] = [];

    passengers.forEach((passenger) => {
        const passengerPrices = getPassengerPrices(passenger);
        pricesList.push(...passengerPrices);
    });

    return pricesList;
}

const getPassengerPrices = (passenger: Partial<Passenger>) => {
    const pricesList: PriceEntry[] = [];

    if (passenger.category) {
        pricesList.push({ type: passenger.category, number: getPrice(passenger.category) });
    }

    if (passenger.baggage?.cabinBaggage) {
        pricesList.push({ type: 'cabinBaggage', number: getPrice('cabinBaggage') });
    }

    if (passenger.baggage?.checkedBaggage) {
        pricesList.push({ type: 'checkedBaggage', number: getPrice('checkedBaggage') });
    }

    return pricesList;
}

export const getTotal = (prices: number[]) => {
    return prices.reduce((acc, curr) => acc + curr, 0);
}
