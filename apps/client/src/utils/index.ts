import { twMerge } from "tailwind-merge"
import { v4 as uuid } from 'uuid';

type option = {
    id: string,
    label: string,
    value: string
}

export const makeOption = (label: string, value: string): option => ({ id: uuid(), label, value })
export const mergeClasses = (className: string | undefined) => twMerge(className);