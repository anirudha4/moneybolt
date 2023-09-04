import { useTransactions } from "@hooks";
import Transaction from "./Transaction";

type Props = {
    showRecent: boolean
}
const Transactions = ({ }: Props) => {
    const { transactions } = useTransactions({});

    return (
        <div className="grid gap-2 h-max overflow-auto">
            {transactions?.map(transaction => {
                return (
                    <Transaction {...transaction} key={transaction.id} />
                )
            })}
        </div>
    )
}
export default Transactions;
