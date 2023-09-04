import { measure } from "@lib/types";
import { mergeClasses } from "@utils";
import { cva } from "class-variance-authority";
import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react"
import { FieldError } from "react-hook-form";

const segmentedControl = cva(classNames(
    "relative flex gap-1 p-[3px] border rounded-md",
    "group duration-100 transition-all overflow-hidden",
    // "focus-within:border-primary"
), {
    variants: {
        size: {
            sm: ['h-10'],
            md: ['h-12'],
            lg: ['h-14']
        }
    }
});
type Option = {
    label: string,
    value: string
}

interface Props extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'measure' | 'size'> {
    size?: measure,
    error?: FieldError,
    options: Option[],
    register: any
}
const SegmentedControl = forwardRef<HTMLInputElement, Props>(({
    error,
    size = 'md',
    className,
    options,
    register
}: Props) => {
    return (
        <div className={mergeClasses(classNames(
            segmentedControl({ className, size }),
            {
                "border-destructive": !!error
            }
        ))}>
            {options.map((option) => (
                <Segment register={register} {...option} key={option.value} />
            ))}
        </div>
    )
})
export default SegmentedControl

type SegmentProps = {
    label: string,
    value: string,
    register: any
}
const Segment = ({ label, value, register }: SegmentProps) => {
    return (
        <div className={classNames(
            "h-full flex-1"
        )}>
            <input
                {...register('type')}
                id={value}
                type="radio"
                value={value}
                className="hidden peer"
            />
            <label
                key={value}
                tabIndex={0}
                className={mergeClasses(classNames(
                    "h-full flex items-center text-xs text-muted-foreground rounded",
                    "duration-100 flex-1 justify-center font-semibold text-[10px]  cursor-pointer",
                    "peer-checked:bg-secondary peer-checked:text-secondary-foreground"
                ))}
                htmlFor={value}
            >
                {label}
            </label>
        </div>
    )
}