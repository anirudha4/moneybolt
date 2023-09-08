import { TransactionIcon } from "@components/common/icons";
import { Button } from "@components/custom";
import { Transactions as AllTransactions } from "@components/transactions";
import { Card } from "@pages/dashboard/Dashboard";

type Props = {}
const Transactions = ({ }: Props) => {
    return (
        <div className="grid lg:grid-cols-3 gap-4 h-full overflow-auto">
            <Card
                className="col-span-2 row-span-4"
                title="Transactions"
                rightAction={
                    <Button size="sm">
                        Add Transaction
                        <TransactionIcon />
                    </Button>
                }
            >
                <AllTransactions />
            </Card>
        </div>
    )
}
export default Transactions;