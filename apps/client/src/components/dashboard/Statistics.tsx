type Props = {}
const Statistics = ({ }: Props) => {
    return (
        <div className="h-full flex col-span-2 justify-between">
            <Stat title="Income" value="Rs. 3,00,000.00" />
            <div className="h-[70%] self-center border-r w-[1px]"></div>
            <Stat title="Expense" value="Rs. 50,000.00" />
            <div className="h-[70%] self-center border-r w-[1px]"></div>
            <Stat title="Investment" value="Rs. 16,000.00" />
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