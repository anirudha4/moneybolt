import { useTransactions } from "@hooks";
import Transaction from "./Transaction";
import { Empty } from "@components/common";
import { TransactionIcon } from "@components/common/icons";

type Props = {
    showRecent?: boolean
}
const Transactions = ({ showRecent = false }: Props) => {
    const { transactions } = useTransactions({ showRecent });

    return (
        <>
            {transactions.length === 0 ? (
                <Empty text="No Tranasctions" secondary='Click the "Create Transaction" button to add transaction'  icon={<TransactionIcon strokeWidth={1} />} />
            ) : (
                <div className="p-3 transactions overflow-auto">
                    {transactions.map(transaction => (
                        <Transaction  {...transaction} key={transaction.id} />
                    ))}
                </div>
            )}
        </>
    )
}
export default Transactions;
