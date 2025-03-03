'use client'

const MAX_PASSENGERS = 9

interface Props {
    passengerCount: number
    onAddPassenger: () => void
    onRemovePassenger: () => void
}

export const IncreaseDecrease = (props: Props) => {
    const { passengerCount, onAddPassenger, onRemovePassenger } = props

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Select passengers</h3>

            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="button-secondary w-10 h-10"
                    onClick={onRemovePassenger}
                    disabled={passengerCount <= 1}
                >
                    -
                </button>

                <span className="text-lg font-medium">
                    {passengerCount}
                </span>

                <button
                    type="button"
                    className="button-secondary w-10 h-10"
                    onClick={onAddPassenger}
                    disabled={passengerCount >= MAX_PASSENGERS}
                >
                    +
                </button>
            </div>
        </div>
    )
}
