import { Button, Field, NumberField } from "@components/custom";
import Popup from "@components/custom/Popup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useTransactions } from "@hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const AddTransaction = ({ children }: { children: React.ReactNode }) => {
    return (
        <Popup trigger={children}>
            <div className="flex flex-col gap-2">
                <div className="px-4 min-h-[60px] border-b flex items-center justify-between">
                    <div className="text-secondary-foreground text-md font-medium">
                        Add Transaction
                    </div>
                </div>
            </div>
            <TransactionForm />
        </Popup>
    )
}

const transactionSchema = z.object({
    name: z.string().min(3),
    amount: z.number().positive(),
    type: z.enum(['expense', 'income']).default('expense'),
    categoryId: z.string().default('others'),
    tagId: z.string().optional(),
    date: z.date().default(new Date()),
    description: z.string().optional(),
});

type transactionFormValues = z.infer<typeof transactionSchema>

export const TransactionForm = () => {
    const { createTransaction } = useTransactions({});
    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState
    } = useForm<transactionFormValues>({
        resolver: zodResolver(transactionSchema)
    });

    const onSubmit = async (values: transactionFormValues) => {
        const otherCategory = user?.categories.find(category => category.name === 'Other')
        const payload = {
            ...values,
            categoryId: otherCategory?.id || 'others'
        }
        await createTransaction(payload);
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