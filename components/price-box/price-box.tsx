'use client'

import { useAppSelector } from "@/lib/store/hooks";
import { currency, PricingType } from "@/lib/get-price";
import { getTotal, PriceEntry, usePricesList } from "./use-prices-list";
import { labels } from "@/lib/constants";

export const PriceBox = () => {
    const { passengers } = useAppSelector(state => state.booking);
    const { pricesList, totalAmount } = usePricesList(passengers);

    const groupedPrices = groupPrices(pricesList);

    return (
        <ul>
            {Object.entries(groupedPrices).map(([priceType, price]) => (
                <li key={priceType}>
                    <p>{price.length} x {labels[priceType]} - {getTotal(price)} {currency}</p>
                </li>
            ))}

            <li className="font-bold">
                <p>Total: {totalAmount} {currency}</p>
            </li>
        </ul>
    );
};

const groupPrices = (prices: PriceEntry[]) => {
    return prices.reduce((acc, curr) => {
        acc[curr.type] = [...(acc[curr.type] || []), curr.number];
        return acc;
    }, {} as Record<PricingType, number[]>);
}

