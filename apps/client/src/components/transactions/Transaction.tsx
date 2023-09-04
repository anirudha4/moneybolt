import { Transaction as TransactionType } from "@lib/types/resource-types"
import { TRANSACTION_TYPES } from "@utils/constants"
import classNames from "classnames"

type Props = TransactionType & {}
const Transaction = ({
    name,
    type,
}: Props) => {
    return (
        <>
            <Header />
            <div className="grid grid-cols-5 gap-2 p-2 px-4 items-center">
                <Name name={name} />
                <Type type={type} />
            </div>
        </>
    )
}
export default Transaction

const Header = () => {
    return (
        <div className="grid grid-cols-5 gap-2 p-2 px-4 items-center">
        </div>
    )
}

type NameProps = {
    name: string
}
export const Name = ({ name }: NameProps) => {
    return (
        <div className="font-medium text-secondary-foreground">
            {name}
        </div>
    )
}

type TypeProps = {
    type: 'income' | 'expense'
}
export const Type = ({ type }: TypeProps) => {
    const className = type === TRANSACTION_TYPES.EXPENSE ? 'bg-destructive-foreground text-destructive' : 'bg-primary-foreground text-primary'
    const classNameBlob = type === TRANSACTION_TYPES.EXPENSE ? 'bg-destructive' : 'bg-primary'
    return (
        <div className={classNames("flex items-center gap-2 px-2 h-5 rounded-full w-fit", className)}>
            <div className={classNames("h-2 w-2 rounded-full", classNameBlob)}></div>
            <div className="capitalize text-[10px] font-medium">
                {type}
            </div>
        </div>
    )
}