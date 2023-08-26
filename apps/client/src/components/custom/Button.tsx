import { ButtonHTMLAttributes } from "react"
import { cva } from "class-variance-authority"
import classNames from "classnames"
// 
import { mergeClasses } from "@utils"
import { measure } from "@lib/types"
import Loader from "./Loader"

const button = cva([
    'px-5 font-medium outline-none cursor-pointer duration-200 flex items-center justify-center gap-3',
], {
    variants: {
        intent: {
            primary: [
                'bg-primary text-primary-foreground hover:bg-primary-dark focus:ring'
            ],
            secondary: ['bg-secondary text-secondary-foreground hover:bg-accent'],
            destructive: ['bg-destructive text-destructive-foreground'],
            outline: ['bg-secondary border border-accent text-secondary-foreground hover:bg-accent'],
            disabled: ['bg-slate-200 text-slate-400'],
        },
        size: {
            sm: ['md:h-8 h-7'],
            md: ['md:h-10 h-9'],
            lg: ['md:h-12 h-11'],
        },
        rounded: {
            sm: ['rounded'],
            md: ['rounded-md'],
            lg: ['rounded-lg'],
            full: ['rounded-full']
        }
    }
})

// types and interfaces
export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'disabled'
    size?: measure
    rounded?: measure | 'full',
    loading?: boolean
}

const Button = ({ size = 'md', variant = 'primary', rounded = 'md', loading = false, className, disabled, children, ...props }: Props) => {
    return (
        <button
            className={mergeClasses(
                classNames(button({ className, size, intent: disabled ? 'disabled' : variant, rounded }), 'disabled:bg-secondary')
            )}
            {...props}
        >
            {!loading && children}
            {loading && <Loader size={20} />}
        </button>
    )
}

export default Button;