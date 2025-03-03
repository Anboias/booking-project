'use client'

import React, { useId } from "react";
import { PriceBox } from "@/components/ui";
import { Section } from "@/components/section";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col gap-4 p-4 box-content h-auto sm:flex-row [&>section]:border [&>section]:border-gray-900 [&>section]:px-6 [&>section]:py-8">
            {/* Forms section */}
            <section className="flex flex-col gap-4 justify-start h-auto w-full sm:w-2/3">
                {children}
            </section>

            {/* Price section */}
            <section className="flex flex-col gap-4 w-full sm:w-1/3">
                <Section.Title title="Price" />
                <PriceBox />
            </section>
        </main>
    );
};

