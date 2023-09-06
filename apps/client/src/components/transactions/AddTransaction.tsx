import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Field, NumberField } from "@components/custom";
import Popup from "@components/custom/Popup";
import SegmentedControl from "@components/custom/form/SegmentedControl";
import { useAuth, useTransactions } from "@hooks";
import { TRANSACTION_TYPES } from "@utils/constants";
import Select from "@components/custom/form/Select";
import { makeOptions } from "@utils";

export const AddTransaction = ({ children }: { children: React.ReactNode }) => {
    return (
        <Popup width="w-[350px]" trigger={children}>
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

export const transactionSchema = z.object({
    name: z.string().min(3),
    amount: z.number().positive(),
    type: z.enum(['expense', 'income', 'investment']).default("expense"),
    categoryId: z.string(),
    date: z.date().default(new Date()),
    description: z.string().optional(),
});

export type transactionFormValues = z.infer<typeof transactionSchema>

export const TransactionForm = () => {
    const { createTransaction } = useTransactions({});
    const { user } = useAuth();
    const {
        control,
        register,
        handleSubmit,
        formState,
        reset,
        setValue
    } = useForm<transactionFormValues>({
        resolver: zodResolver(transactionSchema)
    });

    const categoryOptions = useMemo(() => makeOptions(user?.categories), [user?.categories])

    const onSubmit = async (values: transactionFormValues) => {
        const payload = {
            ...values
        }
        await createTransaction(payload);
        reset();
    }
    const handleCategoryChange = (value: string) => setValue("categoryId", value)
    console.log(formState.errors);
    
    return (
        <form className="p-3 grid gap-2" onSubmit={handleSubmit(onSubmit)}>
            <SegmentedControl
                error={formState.errors.type}
                options={Object.keys(TRANSACTION_TYPES).map(type => ({
                    label: type,
                    value: type.toLowerCase()
                }))}
                register={register}
            />
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
            <Controller
                name="categoryId"
                control={control}
                render={({ field: { value, ref } }) => (
                    <Select
                        ref={ref}
                        selected={value}
                        label="Category"
                        options={categoryOptions}
                        onSelectValue={handleCategoryChange}
                        error={formState.errors.categoryId}
                    />
                )}
            />
            <Button>
                Add Transaction
            </Button>
        </form>
    )
}