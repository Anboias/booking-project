'use client'

import { Section } from "@/components/section"
import { useRedirectHome } from "@/lib/hooks/use-redirect-home"
import { useAppSelector } from "@/lib/store/hooks"
import { useRouter } from "next/navigation"

export const SummaryList = () => {
    const router = useRouter()
    const { passengers } = useAppSelector((state) => state.booking)
    useRedirectHome(passengers.length === 0)

    if (passengers.length === 0) {
        return <div>Redirecting...</div>
    }

    return (
        <div className="flex flex-col gap-12 h-auto">
            <ul className="flex flex-col gap-4">
                {passengers.map((passenger) => (
                    <li key={passenger.id}>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold">{passenger.name} ({passenger.category})</h3>

                            <p>{passenger.dateOfBirth}</p>
                            {passenger.baggage?.checkedBaggage && <p>Checked Baggage</p>}
                            {passenger.baggage?.cabinBaggage && <p>Cabin Baggage</p>}
                            {passenger.frequentFlyerNumber && <p>Frequent Flyer Number: {passenger.frequentFlyerNumber}</p>}
                        </div>
                    </li>
                ))}
            </ul>

            <Section.Footer>
                <button type="button" className="button-secondary" onClick={() => router.push('/services')}>Back</button>
                <button type="submit" className="button-primary" onClick={() => null}>Submit</button>
            </Section.Footer>

        </div>
    )
}
