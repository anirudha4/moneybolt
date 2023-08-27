import React from "react";
import classNames from "classnames";

import { InvoiceIcon, TransactionIcon } from "@components/common/icons";
import { Button } from "@components/custom";
import Statistics from "@components/dashboard/Statistics";
import { TbWallet } from "react-icons/tb";
import Transactions from "@components/transactions";
import { Popover, Transition } from "@headlessui/react";

const Dashboard = () => {
    return (
        <div className="h-full grid grid-cols-4 gap-4 grid-rows-4">
            <Card
                className="col-span-2 row-span-1"
                title="Statistics"
                rightAction={(
                    <div className={classNames(
                        "h-8 px-4 text-secondary-foreground bg-secondary rounded-md border",
                        "flex gap-3 items-center"
                    )}>
                        <TbWallet size={18} />
                        <span className="font-medium">Rs. 2,34,000.00</span>
                    </div>
                )}
            >
                <Statistics />
            </Card>
            <Card
                className="row-span-2 col-span-2"
                title="Invoices"
                rightAction={(
                    <Button size="sm">
                        Create Invoice
                        <InvoiceIcon size={16} />
                    </Button>
                )}>
            </Card>
            <Card
                className="col-span-2 row-span-3"
                title="Recent Transactions"
                rightAction={(
                    <AddTransaction>
                        <Button size="sm">
                            Create Transaction
                            <TransactionIcon size={16} />
                        </Button>
                    </AddTransaction>
                )}
            >
                <Transactions showRecent />
            </Card>
            <Card title="Integrations" className="row-span-2 col-span-2">
            </Card>
        </div>
    )
}
export default Dashboard;

export const Card = ({ children, className, title, rightAction }: { children: React.ReactNode, className?: string, title?: string, rightAction?: React.ReactNode }) => {
    return (
        <div
            className={classNames(
                "bg-background border rounded flex flex-col",
                className
            )}
        >
            {title && <div className="px-4 min-h-[60px] border-b flex items-center justify-between">
                <span className="text-secondary-foreground text-md font-medium">
                    {title}
                </span>
                {rightAction}
            </div>}
            <div className="p-2 flex-1">
                {children}
            </div>
        </div>
    )
}

export const AddTransaction = ({ children }: { children: React.ReactNode }) => {
    return (
        <Popover>
            <Popover.Button as={React.Fragment}>
                {children}
            </Popover.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel className={classNames(
                    "absolute z-10 w-[350px] right-0 top-2 bg-background",
                    "rounded-md shadow-lg border"
                )}>
                    <div className="px-4 min-h-[60px] border-b flex items-center justify-between">
                        <span className="text-secondary-foreground text-md font-medium">
                            Add Transaction
                        </span>
                    </div>
                    
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}