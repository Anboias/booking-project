import { SectionTitle } from "@/components/section-title";
import { PriceBox } from "../../components/price-box";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col gap-4 p-4 h-full sm:flex-row [&>section]:border [&>section]:border-gray-900 [&>section]:px-6 [&>section]:py-8">
            {/* Forms section */}
            <section className="flex w-full sm:w-2/3">
                {children}
            </section>

            {/* Price section */}
            <section className="flex flex-col gap-4 w-full sm:w-1/3">
                <SectionTitle title="Price" />
                <PriceBox />
            </section>
        </main>
    );
};

