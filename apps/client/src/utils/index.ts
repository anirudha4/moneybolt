import { twMerge } from "tailwind-merge"

type Option = {
    label: string,
    value: string
}
interface EntityType {
    name: string,
    id: string
}


export const makeOptions = <T extends EntityType>(options: T[] = []): Option[] =>
    options.map((option: T) => makeOption(option.name, option.id))

export const makeOption = (label: string, value: string): Option => ({ label, value })

export const mergeClasses = (className: string | undefined) => twMerge(className);