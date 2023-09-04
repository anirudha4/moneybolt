import { useTransactions } from "@hooks";
import Transaction from "./Transaction";

type Props = {
    showRecent?: boolean
}
const Transactions = ({ showRecent = false }: Props) => {
    const { transactions } = useTransactions({ showRecent });

    return (
        <div className="p-3 transactions">
            {transactions.map(transaction => (
                <Transaction  {...transaction} key={transaction.id} />
            ))}
        </div>
    )
}
export default Transactions;
