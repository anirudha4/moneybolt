import useTransaction from "@hooks/useTransactions"

type Props = {
    showRecent: boolean
}
const Transactions = ({ }: Props) => {
    const { transactions } = useTransaction()
    console.log(transactions);
    return (
        <div>Transactions</div>
    )
}
export default Transactions