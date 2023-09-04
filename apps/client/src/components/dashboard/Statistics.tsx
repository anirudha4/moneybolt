import { Statistic } from "@lib/types";
import { formatCurrency } from "@utils/transaction";

type Props = {
    statistics: Statistic
}
const Statistics = ({ statistics }: Props) => {
    return (
        <div className="h-full flex col-span-2 justify-between">
            <Stat title="Income" value={formatCurrency(statistics.income)} />
            <div className="h-[70%] self-center border-r w-[1px]"></div>
            <Stat title="Expense" value={formatCurrency(statistics.expense)} />
            <div className="h-[70%] self-center border-r w-[1px]"></div>
            <Stat title="Investment" value={formatCurrency(statistics.investment)} />
        </div>
    )
}
export default Statistics;

export const Stat = ({ title, value }: { value: string, title: string }) => {
    return (
        <div className="px-4 flex flex-col flex-1 gap-2 h-full justify-center items-center rounded">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {title}
            </div>
            <div className="font-semibold text-[16px] text-accent-foreground whitespace-nowrap">
                {value}
            </div>
        </div>
    )
}