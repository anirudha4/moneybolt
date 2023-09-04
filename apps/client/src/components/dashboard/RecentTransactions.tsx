import { useTransactions } from "@hooks";
import Transaction from "@components/transactions/Transaction";

type Props = {}
const RecentTransactions = ({ }: Props) => {
    const { transactions } = useTransactions({ showRecent: true });
    return (
        <div className="p-3 overflow-auto grid grid-cols-2 gap-3 items-start">
            {transactions.map(transaction => (
                <Transaction  {...transaction} key={transaction.id} />
            ))}
        </div>
    )
}
export default RecentTransactions