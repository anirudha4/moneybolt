import { Avatar, IconContainer } from "@components/common"
import CategoryIcon from "@components/common/icons/CategoryIcon"
import { PATHS } from "@config/constants/paths"
import { Transaction as TransactionType } from "@lib/types/resource-types"
import { mergeClasses } from "@utils"
import { TRANSACTION_TYPES } from "@utils/constants"
import { formatCurrency } from "@utils/transaction"
import classNames from "classnames"
import { TbEdit } from "react-icons/tb"
import { Link } from "react-router-dom"

type Props = TransactionType & {}
const Transaction = ({
    id = '',
    name,
    type,
    amount,
    date,
    categoryId
}: Props) => {
    return (

        <div className={classNames(
            "border rounded p-3 h-fit flex flex-col gap-3 relative",
            "hover:shadow transition-shadow group"
        )}>
            <Link className="sm:opacity-0 absolute top-2 right-2 group-hover:opacity-100 transition-all duration-200" to={PATHS.TRANSACTION_FROM_DASHBOARD.replace(':transaction_id', id)}>
                <IconContainer icon={<TbEdit />} />
            </Link>
            <div className="flex items-center gap-3">
                <Avatar size="md">
                    <CategoryIcon categoryId={categoryId} />
                </Avatar>
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
                    {formatCurrency(amount)}
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