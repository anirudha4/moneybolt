import { Statistic } from "@lib/types";

type Props = {
    statistics: Statistic
}
const Statistics = ({ statistics }: Props) => {
    return (
        <div className="h-full flex col-span-2 justify-between">
            <Stat title="Income" value={statistics.income.toFixed(2)} />
            <div className="h-[70%] self-center border-r w-[1px]"></div>
            <Stat title="Expense" value={statistics.expense.toFixed(2)} />
            <div className="h-[70%] self-center border-r w-[1px]"></div>
            <Stat title="Investment" value={statistics.investment.toFixed(2)} />
        </div>
    )
}
export default Statistics;

export const Stat = ({ title, value }: { value: string, title: string }) => {
    return (
        <div className="px-4 flex flex-col flex-1 gap-2 h-full justify-center items-center rounded">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Rs. {title}
            </div>
            <div className="font-semibold text-[16px] text-accent-foreground whitespace-nowrap">
                {value}
            </div>
        </div>
    )
}