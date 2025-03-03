'use client'

import { Section } from "@/components/section"
import { PassengerField } from "./passenger-field"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { savePassengers, addPassengerDraft, removePassengerDraft } from "@/lib/store/bookingSlice"
import { passengerSchema, Passenger } from "@/lib/schema"
import { useRouter } from "next/navigation"
import { IncreaseDecrease } from "./increase-decrease"

export const PassengersList = () => {
    const { passengers, passengersDraft } = useAppSelector((state) => state.booking)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const form = useForm<{ passengers: Passenger[] }>({
        mode: 'all',
        defaultValues: {
            passengers: passengers.length ? passengers : []
        },
        resolver: zodResolver(z.object({
            passengers: z.array(passengerSchema)
        })),
    })

    const onSubmit = (data: { passengers: Passenger[] }) => {
        // Validate passengers
        const validatedPassengers = data.passengers.map(passenger => passengerSchema.parse(passenger))

        if (validatedPassengers.length !== passengersDraft.length) {
            alert('Please fill in all mandatory fields')
            return
        }

        dispatch(savePassengers(validatedPassengers))
    }

    const handleDelete = (index: number) => () => {
        const currentPassengers = form.getValues('passengers')
        form.setValue('passengers', currentPassengers.filter((_, i) => i !== index))
        dispatch(removePassengerDraft(currentPassengers[index].id))
    }

    const handleAddPassenger = () => {
        const currentPassengers = form.getValues('passengers')

        const id = currentPassengers.length ? currentPassengers[currentPassengers.length - 1].id + 1 : 0

        const newPassenger = {
            id,
            category: 'adult' as const,
            name: '',
            dateOfBirth: null,
            frequentFlyerNumber: ''
        }

        form.setValue('passengers', [...currentPassengers, newPassenger])

        dispatch(addPassengerDraft(newPassenger))
    }

    const handleRemovePassenger = () => {
        const currentPassengers = form.getValues('passengers')
        form.setValue('passengers',
            currentPassengers.slice(0, -1)
        )

        dispatch(removePassengerDraft(currentPassengers[currentPassengers.length - 1].id))
    }

    const hasErrors = Object.keys(form.formState.errors).length > 0;
    const isValid = form.formState.isValid;
    const passengerCount = form.watch('passengers').length;
    const hasEntries = passengerCount > 0;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12 h-auto">
            <IncreaseDecrease
                passengerCount={passengerCount}
                onAddPassenger={handleAddPassenger}
                onRemovePassenger={handleRemovePassenger}
            />

            <ul className="space-y-4">
                {form.watch('passengers').map((passenger, index) => (
                    <li key={index}>
                        <PassengerField
                            form={form}
                            index={index}
                            passenger={passenger}
                            onDelete={handleDelete(index)}
                        />
                    </li>
                ))}
            </ul>

            <Section.Footer>
                <button type="button" className="button-secondary opacity-0" disabled>Back</button>
                <button type="submit" className="button-primary" disabled={!hasEntries || hasErrors || !isValid} onClick={() => router.push('/services')}>Next</button>
            </Section.Footer>
        </form>
    )
}
