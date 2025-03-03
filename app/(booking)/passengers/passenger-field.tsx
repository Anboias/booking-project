'use client'

import React from "react"
import { Passenger, PassengerCategory, passengerCategories } from "@/lib/schema"
import { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { Select } from "@/components/ui/select"
import { updatePassengerDraft } from "@/lib/store/bookingSlice"
import { useAppDispatch } from "@/lib/store/hooks"
import { getAppropriateCategoryByAge } from "@/lib/get-category"
import { formatDate } from "@/lib/dates"

interface Props {
    form: UseFormReturn<{ passengers: Passenger[] }>,
    index: number,
    passenger: Passenger,
    onDelete: () => void
}

export const PassengerField = (props: Props) => {
    const { form, index, passenger, onDelete } = props

    const dispatch = useAppDispatch()

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        form.setValue(`passengers.${index}.category`, e.target.value as PassengerCategory)
        form.setValue(`passengers.${index}.dateOfBirth`, null)

        dispatch(updatePassengerDraft({
            id: passenger.id,
            category: e.target.value as PassengerCategory,
            dateOfBirth: null,
        }))
    }

    const handleDateOfBirthChange = (date: Date | null) => {
        const newCategory = getAppropriateCategoryByAge(date)
        const category = newCategory || passenger.category

        form.setValue(`passengers.${index}.category`, category)
        form.setValue(`passengers.${index}.dateOfBirth`, formatDate(date))

        dispatch(updatePassengerDraft({
            id: passenger.id,
            dateOfBirth: formatDate(date),
            category: newCategory || category,
        }))
    }

    return (
        <div className="flex flex-wrap align-middle  gap-4 border border-gray-900 p-4 rounded-md">
            <Select
                label="Category *"
                options={passengerCategories}
                {...form.register(`passengers.${index}.category`)}
                onChange={handleCategoryChange}
            />
            <Input
                label="Name *"
                required
                {...form.register(`passengers.${index}.name`)}
                error={form.formState.errors.passengers?.[index]?.name?.message}
            />

            <DatePicker
                label="Date of birth *"
                {...form.register(`passengers.${index}.dateOfBirth`)}
                onChange={handleDateOfBirthChange}
                value={form.getValues(`passengers.${index}.dateOfBirth`)}
            />

            {passenger.category === 'adult' && (
                <Input
                    label="Frq flyer number (optional)"
                    {...form.register(`passengers.${index}.frequentFlyerNumber`)}
                    error={form.formState.errors.passengers?.[index]?.frequentFlyerNumber?.message}
                />
            )}

            {/* Delete this passenger */}
            <button onClick={onDelete} type="button" role="button" className="button-alert mt-auto">
                X
            </button>
        </div>
    )
}
