import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export const Input = ({ className, label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={props.id}>{label}</label>
            <input
                className={clsx(className, {
                    "border-red-500": error
                })}
                {...props}
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}