import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "@components/custom/form/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Field, NumberField } from "@components/custom";
import SegmentedControl from "@components/custom/form/SegmentedControl";
import { transactionFormValues, transactionSchema } from "@components/transactions/AddTransaction";

import { useAuth, useWallet } from "@hooks";
import { Transaction } from "@lib/types/resource-types";
import { TRANSACTION_TYPES } from "@utils/constants";
import { makeOptions } from "@utils";

type Props = {
    transaction: Transaction | undefined
    updateTransaction: (values: Transaction) => void
    isUpdatingTransaction: boolean
}
const EditTransaction = ({ transaction, isUpdatingTransaction, updateTransaction }: Props) => {

    const { user } = useAuth();
    const { wallets = [] } = useWallet({});
    const {
        register,
        handleSubmit,
        formState,
        setValue,
        control,
    } = useForm<transactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            ...transaction,
            date: transaction?.date
        },
        values: {
            ...transaction,
            name: transaction?.name || '',
            amount: transaction?.amount || 0,
            type: transaction?.type || 'expense',
            categoryId: transaction?.categoryId || '',
            date: new Date(transaction?.date || new Date()).toString(),
            description: '',
            walletId: transaction?.walletId || ''
        }
    });


    const categoryOptions = useMemo(() => makeOptions(user?.categories), [user?.categories])
    const walletOptions = useMemo(() => makeOptions(wallets), [wallets])

    // handlers
    const onSubmit = async (values: transactionFormValues) => {
        await updateTransaction({ id: transaction?.id, ...values });
    }
    const handleCategoryChange = (value: string) => setValue("categoryId", value)
    const handleWalletChange = (value: string) => setValue("walletId", value)

    return (
        <form className="p-5 grid gap-4" autoFocus={false} onSubmit={handleSubmit(onSubmit)}>
            <Field error={formState.errors.name} id="name" {...register('name', { required: true })} label="Name" placeholder="Eg. Bring Milk" autoFocus={false} autoComplete="off" />
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
            <SegmentedControl
                name={"type"}
                error={formState.errors.type}
                options={Object.keys(TRANSACTION_TYPES).map(type => ({
                    label: type,
                    value: type.toLowerCase()
                }))}
                register={register}
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
                    />
                )}
            />
            <Controller
                name="walletId"
                control={control}
                render={({ field: { value, ref } }) => (
                    <Select
                        ref={ref}
                        selected={value}
                        label="Choose Wallet"
                        options={walletOptions}
                        onSelectValue={handleWalletChange}
                        error={formState.errors.walletId}
                    />
                )}
            />
            <Button loading={isUpdatingTransaction}>
                Update Transaction
            </Button>
        </form>
    )
}
export default EditTransaction;
