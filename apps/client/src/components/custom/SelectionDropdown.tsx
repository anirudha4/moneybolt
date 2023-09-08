import React, { Fragment, ReactElement, useEffect, useMemo, useRef, useState } from "react"
import { Option } from "./form/Select"
import { Listbox } from "@headlessui/react"
import classNames from "classnames"
import { TbCheck } from "react-icons/tb"
import { FiSearch } from "react-icons/fi"

type Props = {
    options: Option[],
    selected: string,
    onSelect: (value: string) => void,
    trigger: ReactElement,
    className?: string,
    error?: string
}
const SelectionDropdown = ({ options, selected, onSelect, trigger, className }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const filteredOptions = useMemo(() => {
        return options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()))
    }, [query])

    const onChange = (value: string) => onSelect(value)
    useEffect(() => {
        inputRef.current?.focus();
    }, [inputRef.current])
    return (
        <Listbox value={selected} onChange={onChange} as={'div'} className={'relative z-200'}>
            <Listbox.Button as={Fragment}>
                {React.cloneElement(trigger)}
            </Listbox.Button>
            <Listbox.Options className={classNames(
                "absolute left-0 mt-2 w-full rounded shadow-lg bg-background",
                " focus:outline-none border max-h-[285px] z-50",
                "flex flex-col",
                className
            )}>
                <div className="flex items-center gap-2 border-b px-2">
                    <FiSearch className="text-muted-foreground" />
                    <input
                        ref={inputRef}
                        type="text"
                        autoFocus={true}
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        placeholder="Search"
                        className={classNames(
                            "w-full outline-none py-2 sm:text-xs"
                        )}
                    />
                </div>
                <div className="p-[4px] z-50 flex-1 overflow-auto">
                    {filteredOptions.map((option, index) => (
                        <Listbox.Option key={index} value={option.value}>
                            {({ active, selected }) => (
                                <div
                                    className={classNames(
                                        "flex items-center justify-between h-[40px] sm:h-[30px] sm:text-xs rounded px-3 capitalize",
                                        "font-medium cursor-pointer hover:bg-muted w-full transition-all",
                                        { "bg-muted": active }
                                    )}
                                >
                                    {option.label}
                                    {selected && (
                                        <TbCheck className='text-muted-foreground' size={16} />
                                    )}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                    {filteredOptions.length === 0 && (
                        <div className="text-xs text-muted-foreground px-3 py-2">
                            No options
                        </div>
                    )}
                </div>
            </Listbox.Options>
        </Listbox>
    )
}
export default SelectionDropdown;