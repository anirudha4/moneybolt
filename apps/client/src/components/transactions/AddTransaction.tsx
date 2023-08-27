import { Button, Field, NumberField } from "@components/custom";
import Popup from "@components/custom/Popup";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { TbBolt } from "react-icons/tb";
import { z } from "zod";

export const AddTransaction = ({ children }: { children: React.ReactNode }) => {
    return (
        <Popup trigger={children}>
            <div className="flex flex-col gap-2">
                <div className="px-4 min-h-[60px] border-b flex items-center justify-between">
                    <div className="text-secondary-foreground text-md font-medium">
                        Add Transaction
                    </div>
                    <Popup positionClasses="left-[110%] bottom-[2px]" trigger={(
                        <div className="cursor-pointer px-3 h-6 font-medium text-xs flex gap-2 items-center bg-secondary rounded-full text-primary">
                            <TbBolt size={15} />
                            Quick Add
                        </div>
                    )}>
                        <div className="p-3">
                            By using <span className="text-primary">Quick Add</span> you can add a transaction by just entering the <span className="text-primary">Name</span> and <span className="text-primary">Amount</span> of the transaction. The transaciton will get added with<span className="text-primary"> today's date</span> and the <span className="text-primary">default category</span>.
                        </div>
                    </Popup>
                </div>
            </div>
            <TransactionForm />
        </Popup>
    )
}

const transactionSchema = z.object({
    name: z.string().min(3),
    amount: z.number().positive(),
    type: z.string().default('expense'),
    categoryId: z.string().default('others'),
    tagId: z.string().optional(),
    date: z.date().default(new Date()),
    description: z.string().optional(),
});

type transactionFormValues = z.infer<typeof transactionSchema>

export const TransactionForm = () => {
    const {
        register,
        handleSubmit,
        formState
    } = useForm<transactionFormValues>({
        resolver: zodResolver(transactionSchema)
    });
    
    const onSubmit = async (values: transactionFormValues) => {
        console.log({ values });

    }
    return (
        <form className="p-3 grid gap-2" onSubmit={handleSubmit(onSubmit)}>
            <Field autoComplete="off" error={formState.errors.name} id="name" {...register('name', { required: true })} label="Name" placeholder="Eg. Bring Milk" />
            <NumberField
                error={formState.errors.amount}
                id="amount"
                {...register('amount', {
                    required: true,
                    setValueAs: value => value === "" ? undefined : parseInt(value) ? parseInt(value) : ''
                })}
                label="Amount"
                placeholder="Enter Amount"
                notation="Rs."
            />

            <Button>
                Add Transaction
            </Button>
        </form>
    )
}