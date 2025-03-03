'use client'

import { compareAsc } from "date-fns";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
interface Props {
    label: string;
    value: string | null;
    onChange: (date: Date | null) => void;
}

export const DatePicker = (props: Props) => {
    const { label, value, onChange } = props;

    const [inputValue, setInputValue] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);

    const today = new Date();

    useEffect(() => {
        setStartDate(value ? new Date(value) : null);
        setInputValue(value || null);
    }, [value]);

    const handleChange = (date: Date | null) => {
        if (!date) return;

        // If the date is later than today, set it to today
        if (compareAsc(date, today) > 0) {
            date = today;
        }

        setStartDate(date);
        onChange(date);
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="date-picker">{label}</label>
            <ReactDatePicker
                selected={startDate}
                maxDate={today}
                value={inputValue || undefined}
                dateFormat="yyyy-MM-dd"
                onChange={handleChange}
                onChangeRaw={e => {
                    if (!e?.target || !(e.target instanceof HTMLInputElement)) return;
                    setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key !== 'Enter') {
                        return;
                    }

                    e.preventDefault();
                    const date = new Date(inputValue || '');
                    if (!isNaN(date.getTime())) {
                        handleChange(date);
                    }
                }}
            />
        </div>
    );
};
