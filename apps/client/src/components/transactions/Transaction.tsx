import { Avatar } from "@components/common"
import CategoryIcon from "@components/common/icons/CategoryIcon"
import { Transaction as TransactionType } from "@lib/types/resource-types"
import { mergeClasses } from "@utils"
import { TRANSACTION_TYPES } from "@utils/constants"
import { formatCurrency, formatTransactionDate } from "@utils/transaction"
import classNames from "classnames"
import { useMemo } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

type Props = TransactionType & {}
const Transaction = ({
    id = '',
    name,
    type,
    amount,
    date,
    categoryId
}: Props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const routeTo = useMemo(() => {
        const screen = pathname.split('/')[2];
        return `/app/${screen}/view/${id}`;
    }, [id, navigate, pathname])
    return (
        <Link
            className={classNames(
                "border rounded p-3 h-fit flex flex-col gap-3 relative cursor-pointer",
                "hover:shadow transition-shadow group z-0"
            )}
            replace
            to={routeTo}
        >
            <div className="flex items-center gap-3">
                <Avatar size="md">
                    <CategoryIcon categoryId={categoryId} />
                </Avatar>
                <div className="flex flex-col justify-center truncate">
                    <div className="font-semibold text-secondary-foreground truncate">
                        {name}
                    </div>
                    <div className="text-[10px] uppercase text-muted-foreground">
                        {formatTransactionDate(date)}
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
        </Link>
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
        <div className={classNames("flex items-center gap-2 px-3 h-7 sm:h-5 rounded-full w-fit", className)}>
            <div className={classNames("h-2 w-2 rounded-full", classNameBlob)}></div>
            <div className="uppercase tracking-wider text-xs sm:text-[10px] font-semibold">
                {type}
            </div>
        </div>
    )
}