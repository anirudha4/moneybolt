import { useTransactions } from "@hooks";
import Transaction from "./Transaction";

type Props = {
    showRecent: boolean
}
const Transactions = ({ }: Props) => {
    const { transactions } = useTransactions({ showRecent: true });

    return (
        <div className="grid gap-2 h-max overflow-auto">
            {transactions?.map(transaction => {
                return (
                    <Transaction {...transaction} />
                )
            })}
        </div>
    )
}
export default Transactions;
