import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, createContext, forwardRef, useMemo, useState } from "react"
import { FieldError } from "react-hook-form"
import { Combobox } from "@headlessui/react"
import { BiError } from "react-icons/bi"
import { TbCheck, TbSelector } from "react-icons/tb"
import { motion } from "framer-motion"
import classNames from "classnames"

import { field } from "./Field"

import { measure } from "@lib/types"
import { mergeClasses } from "@utils"

type Option = {
    label: string,
    value: string
}
interface Props extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'measure' | 'size'> {
    options: Option[],
    onSelectValue: (value: string) => void,
    children?: React.ReactNode,
    size?: measure,
    label?: string,
    error?: FieldError,
    selected: string | undefined
}
type SelectContextType = {
    selected: string | undefined,
    filteredOptions: Option[],
    onChange: (option: Option) => void
}

export const SelectContext = createContext<SelectContextType>({
    selected: '',
    onChange: (option: Option) => console.log(option),
    filteredOptions: []
});

const Select = forwardRef<HTMLInputElement, Props>(({ options, id, name, selected = '', children, size = "md", label, error, className, value, onSelectValue, autoFocus = false, ...props }: Props, ref) => {
    const [query, setQuery] = useState<string>('')
    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)

    const filteredOptions = useMemo(() =>
        options.filter(option => option.label.toLowerCase().includes(query.toLowerCase())), [query, options])

    const selectedOption = useMemo(() => options.find(option => option.value === selected) || { label: '', value: '' }, [selected, options]);

    const onChange = (option: Option) => {
        onSelectValue(option.value)
    }

    return (
        <SelectContext.Provider value={{
            selected,
            filteredOptions,
            onChange
        }}>
            <input type="hidden" ref={ref} value={selected} name={name} {...props} />
            <Combobox value={selectedOption} by={'value'} onChange={onChange}>
                <div className="w-full relative">
                    <Combobox.Button
                        className={mergeClasses(classNames(
                            field({ className, intent: "contained", size }),
                            "w-full",
                            {
                                "border-destructive": !!error
                            }
                        ))}
                    >
                        <TbSelector size={16} className="absolute right-[10px] top-[50%] translate-y-[-50%]" />
                        <label
                            htmlFor={id}
                            className={mergeClasses(classNames(
                                "px-2 text-xs text-muted-foreground block pt-1 group-focus-within:text-primary-dark duration-100",
                                {
                                    "text-destructive": !!error
                                }
                            ))}
                        >
                            {label}
                        </label>
                        <Combobox.Input
                            placeholder="Search Category"
                            displayValue={(option: Option) => option.label}
                            onChange={handleQueryChange}
                            autoComplete="off"
                            className="px-2 outline-none block h-full text-accent-foreground bg-background w-full"
                            id={id}
                            autoFocus={autoFocus}
                        />
                    </Combobox.Button>
                    {error && (
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ bounceStiffness: 100 }} className="text-destructive text-sm mt-1 flex gap-2 items-center">
                            <BiError size={18} />
                            <span>
                                {error.message}
                            </span>
                        </motion.div>
                    )}
                    {!children && (
                        <Combobox.Options className={classNames(
                            "absolute mt-1 p-1 bg-background rounded-md shadow border w-full max-h-[280px] overflow-auto"
                        )}>
                            {filteredOptions.map((option) => <Option key={option.value} option={option} />)}
                            {filteredOptions.length === 0 && (
                                <div
                                    className={mergeClasses(classNames(
                                        "p-2 flex items-center justify-center cursor-pointer rounded"
                                    ))}>
                                        <div className="text-muted-foreground">
                                            No options 
                                        </div>
                                </div>
                            )}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
        </SelectContext.Provider >
    )
})

export default Select;

type OptionProps = {
    option: Option
}

const Option = ({ option }: OptionProps) => {
    return (
        <Combobox.Option
            value={option}
        >
            {({ active, selected }) => (
                <div
                    className={mergeClasses(classNames(
                        "px-2 h-[35px] flex items-center justify-between cursor-pointer rounded",
                        {
                            'bg-secondary text-primary': active || selected,
                        }
                    ))}
                    key={option.value}
                >
                    <span>{option.label}</span>
                    {selected && <TbCheck />}
                </div>

            )}
        </Combobox.Option>
    )
}