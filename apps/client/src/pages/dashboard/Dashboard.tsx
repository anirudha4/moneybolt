import React from "react";
import classNames from "classnames";
import { TbWallet } from "react-icons/tb";

import { IntegrationIcon, InvoiceIcon, TransactionIcon } from "@components/common/icons";
import { Button } from "@components/custom";
import Statistics from "@components/dashboard/Statistics";
import { useTransactions } from "@hooks";
import { formatCurrency } from "@utils/transaction";
import { AddTransaction, Transactions } from "@components/transactions";
import { Empty } from "@components/common";
import { FiArrowUpRight } from "react-icons/fi";

const Dashboard = () => {
    const { statistics } = useTransactions({});
    return (
        <div className="h-full grid grid-cols-4 gap-4 dashboard">
            <Card
                className="col-span-2 row-span-1"
                title="Statistics"
                rightAction={(
                    <div className={classNames(
                        "h-8 px-4 text-secondary-foreground bg-secondary rounded-md border",
                        "flex gap-3 items-center"
                    )}>
                        <TbWallet size={18} />
                        <span className="font-medium">{formatCurrency(statistics.total)}</span>
                    </div>
                )}
            >
                <Statistics statistics={statistics} />
            </Card>
            <Card
                className="col-span-2 row-span-4"
                title="Recent Transactions"
                rightAction={(
                    <AddTransaction>
                        <Button size="sm">
                            Add Transaction
                            <TransactionIcon size={16} />
                        </Button>
                    </AddTransaction>
                )}
            >
                <Transactions showRecent={true} />
            </Card>
            <Card
                className="row-span-1 col-span-2"
                title="Invoices"
                rightAction={(
                    <Button variant="primary-light" size="sm">
                        Create Invoice
                        <FiArrowUpRight size={16} />
                    </Button>
                )}
            >
                <Empty text="No Invoices" secondary="You can club multiple transactions to create a invoice" icon={<InvoiceIcon strokeWidth="1" />} />
            </Card>
            <Card
                title="Integrations"
                className="row-span-2 col-span-2"
                rightAction={(
                    <Button variant="primary-light" size="sm">
                        Connect
                        <FiArrowUpRight size={16} />
                    </Button>
                )}
            >
                <Empty text="No Integrations Configured" secondary="Import, manage and sync transactions with 3rd party services" icon={<IntegrationIcon strokeWidth={1} />} />
            </Card>
        </div>
    )
}
export default Dashboard;

export const Card = ({ children, className, title, rightAction }: { children: React.ReactNode, className?: string, title?: string, rightAction?: React.ReactNode }) => {
    return (
        <div
            className={classNames(
                "bg-background border rounded flex flex-col h-full",
                className
            )}
        >
            {title && <div className="px-4 min-h-[60px] border-b flex items-center justify-between">
                <span className="text-secondary-foreground text-md font-medium">
                    {title}
                </span>
                {rightAction}
            </div>}
            {children}
        </div>
    )
}

