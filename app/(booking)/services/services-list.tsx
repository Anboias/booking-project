'use client'

import { Section } from "@/components/section"
import { useRedirectHome } from "@/lib/hooks/use-redirect-home"
import { toggleBaggage } from "@/lib/store/bookingSlice"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import clsx from "clsx"
import { useRouter } from "next/navigation"

export const ServicesList = () => {
    const router = useRouter()

    const dispatch = useAppDispatch()
    const { passengers } = useAppSelector((state) => state.booking)

    useRedirectHome(passengers.length === 0)

    const handleUpdateBaggage = (passengerId: number, type: 'cabinBaggage' | 'checkedBaggage') => () => {
        dispatch(toggleBaggage({ id: passengerId, type }))
    }

    if (passengers.length === 0) {
        return <div>Redirecting...</div>
    }

    return (
        <div className="flex flex-col gap-12 h-auto">
            <ul className="flex flex-col gap-4">
                {passengers.map((passenger) => (
                    <li key={passenger.id}>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-bold">{passenger.name}</h3>

                            {passenger.category !== 'infant' && (
                                <button
                                    type="button"
                                    className={clsx('button-secondary', passenger.baggage?.checkedBaggage ? 'bg-green-500' : '')}
                                    onClick={handleUpdateBaggage(passenger.id, 'checkedBaggage')}
                                >
                                    Checked Baggage
                                </button>
                            )}

                            <button
                                type="button"
                                className={clsx('button-secondary', passenger.baggage?.cabinBaggage ? 'bg-green-500' : '')}
                                onClick={handleUpdateBaggage(passenger.id, 'cabinBaggage')}
                            >
                                Cabin Baggage
                            </button>

                        </div>
                    </li>
                ))}
            </ul>

            <Section.Footer>
                <button type="button" className="button-secondary" onClick={() => router.push('/passengers')}>Back</button>
                <button type="submit" className="button-primary" onClick={() => router.push('/summary')}>Next</button>
            </Section.Footer>

        </div>
    )
}
