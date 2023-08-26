import { mergeClasses } from "@utils"
import { cva } from "class-variance-authority"
import { HTMLAttributes } from "react"

const alert = cva('px-3 h-10 rounded-md flex items-center', {
    variants: {
        intent: {
            primary: 'bg-primary-foreground text-primary hover:text-primary-dark',
            destructive: 'bg-destructive-foreground text-destructive',
            secondary: 'bg-secondary-foreground text-secondary',
        }
    }
})

interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'destructive'
}
const Alert = ({ variant = 'destructive', className, children }: Props) => {
    return (
        <div className={mergeClasses(alert({ className, intent: variant }))}>
            {children}
        </div>
    )
}
export default Alert