import Modal from "@components/custom/Modal"
import { EditTransaction } from "@components/transactions";
import { useTransactions } from "@hooks";
import { TransactionWithCategory } from "@lib/types/resource-types";
import { useEffect, useRef } from "react";

type Props = {
    id: string
}

const TransactionExpand = ({ id }: Props) => {
    const { transaction, updateTransaction, isUpdatingTransaction } = useTransactions({ id: id });
    if (!transaction) {
        return null
    }

    return (
        <Modal title={"Transaction Details"} trigger={null} isOpen={!!id} key={id}>
            <EditTransaction
                transaction={transaction}
                updateTransaction={updateTransaction}
                isUpdatingTransaction={isUpdatingTransaction}
            />
        </Modal>
    )
}
export default TransactionExpand;

type NameFieldProps = {
    value: string | undefined,
    transaction: TransactionWithCategory | undefined,
    name: string
}
export const NameField = ({
    value,
    transaction,
    name
}: NameFieldProps) => {
    const { updateTransaction } = useTransactions({ id: transaction?.id });
    const ref = useRef<HTMLInputElement>(null);

    const handleBlur = () => {
        handleUpdate();
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUpdate();
            ref.current?.blur();
        }
    }
    const handleUpdate = () => {
        if (ref.current && transaction && (ref.current.value !== value)) {
            updateTransaction({ ...transaction, [name]: ref.current.value })
        }
    }
    useEffect(() => {
        if (ref.current) {
            ref.current.value = value || '';
        }
    }, [value])
    return (
        <div className="flex w-full">
            <input
                type="text"
                name="name"
                id="name"
                className="border text-secondary-foreground h-[35px] border-transparent  px-2 outline-none w-full  rounded transition-all duration-200 hover:bg-muted focus:text-accent-foreground focus:border-border focus:bg-background"
                defaultValue={value}
                ref={ref}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}