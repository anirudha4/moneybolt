import { Avatar } from "@components/common"
import { Transaction as TransactionType } from "@lib/types/resource-types"
import { mergeClasses } from "@utils"
import { TRANSACTION_TYPES } from "@utils/constants"
import classNames from "classnames"

type Props = TransactionType & {}
const Transaction = ({
    name,
    type,
    amount,
    date,
}: Props) => {
    return (
        <div className={classNames(
            "border rounded p-3 h-fit flex flex-col gap-3 cursor-pointer",
            "hover:shadow transition-shadow"
        )}>
            <div className="flex items-center gap-3">
                <Avatar size="md" character={name.charAt(0).toUpperCase()} />
                <div className="flex flex-col justify-center truncate">
                    <div className="font-semibold text-secondary-foreground truncate">
                        {name}
                    </div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                        {new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                </div>
            </div>
            <div className="border-b"></div>
            <div className="flex justify-between items-center truncate">
                <div className={mergeClasses(classNames(
                    "text-xs font-medium text-accent-foreground truncate"
                ))}>
                    {type !== 'income' && <>-</>} Rs. {amount.toFixed(2)}
                </div>
                <Type type={type} />
            </div>
        </div>
    )
}
export default Transaction

type TypeProps = {
    type: 'income' | 'expense' | 'investment'
}
export const Type = ({ type }: TypeProps) => {
    const className = type === TRANSACTION_TYPES.EXPENSE ? 'bg-destructive-foreground text-destructive' : 'bg-primary-foreground text-primary'
    const classNameBlob = type === TRANSACTION_TYPES.EXPENSE ? 'bg-destructive' : 'bg-primary'
    return (
        <div className={classNames("flex items-center gap-2 px-3 h-5 rounded-full w-fit", className)}>
            <div className={classNames("h-2 w-2 rounded-full", classNameBlob)}></div>
            <div className="uppercase tracking-wider text-[10px] font-semibold">
                {type}
            </div>
        </div>
    )
}