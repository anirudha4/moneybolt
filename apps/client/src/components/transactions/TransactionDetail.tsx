import { TransactionWithCategory } from "@lib/types/resource-types"
import { formatCurrency } from "@utils/transaction"
import classNames from "classnames"
import React, { ReactElement } from "react"
import { Type } from "./Transaction"
import { TbPencil } from "react-icons/tb"

type Props = {
    setIsEditing?: (value: boolean) => void,
    transaction: TransactionWithCategory | undefined
}
const TransactionDetail = ({ transaction, setIsEditing = () => { } }: Props) => {
    return (
        <div className={classNames(
            "p-6 relative",
        )}>
            <div
                className={classNames(
                    "absolute right-4 top-2 h-[35px] w-[35px] min-w-[35px] flex items-center justify-center rounded hover:bg-secondary transition-all duration-200", "cursor-pointer border border-transparent hover:border-border group"
                )}
                onClick={() => setIsEditing(true)}
            >
                <TbPencil className="text-muted-foreground group-hover:text-accent-foreground transition-all duration-200" />
            </div>
            <div className="flex flex-col gap-6">
                <Section title="Amount" value={formatCurrency(transaction?.amount)} />
                <Section title="Category">
                    <div className="flex items-center gap-2">
                        {transaction?.category?.name}
                    </div>
                </Section>
                <Section title="Type">
                    {transaction?.type && <Type type={transaction.type} />}
                </Section>
                {transaction?.date && <Section title="Date" value={new Date(transaction.date).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })} />}
            </div>
        </div>
    )
}
export default TransactionDetail;

const Section = ({ title, value, children }: { title: string, value?: string | undefined, children?: ReactElement }) => {
    return (
        <div className="grid grid-cols-3">
            <div className="text-muted-foreground col-span-1">{title}</div>
            {value && <div className="text-secondary-foreground font-medium col-span-2">
                {value}
            </div>}
            {children && React.cloneElement(children, { className: "col-span-2" })}
        </div>
    )
}