import Transactions from "@components/transactions"

type Props = {}
const RecentTransaction = ({ }: Props) => {
    return (
        <div className="py-3 h-full overflow-auto">
            <Transactions showRecent />
        </div>
    )
}
export default RecentTransaction