// Implement dropdown select component

import { SelectHTMLAttributes } from "react";
import clsx from "clsx";

export const Select = ({ className, label, options, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: string[] }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={props.id}>{label}</label>
            <select
                className={clsx(className, 'border border-gray-900 rounded-md p-2')}
                {...props}
            >
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
