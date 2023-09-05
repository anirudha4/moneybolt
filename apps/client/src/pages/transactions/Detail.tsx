import { Button, Field, NumberField } from "@components/custom";
import SegmentedControl from "@components/custom/form/SegmentedControl";
import { transactionFormValues, transactionSchema } from "@components/transactions/AddTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useTransactions } from "@hooks";
import { TRANSACTION_TYPES } from "@utils/constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type Props = {}
const Detail = ({ }: Props) => {
    const { transaction_id } = useParams();
    const { transaction } = useTransactions({ id: transaction_id });

    const { user } = useAuth();
    const {
        register,
        handleSubmit,
        formState,
        setValue
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
            date: new Date(transaction?.date || new Date()),
            description: ''
        },
    });


    // handlers
    const onSubmit = async (values: transactionFormValues) => {
        const otherCategory = user?.categories?.find(category => category.name === 'Other')
        const payload = {
            ...values,
            categoryId: otherCategory?.id || 'others'
        }
        console.log(payload);
        
    }


    // effects
    useEffect(() => {
        if (user?.categories?.length) {
            const otherCategory = user?.categories?.find(category => category.name === 'Other')
            if (otherCategory) {
                setValue("categoryId", otherCategory.id)
            }
        }
    }, [user?.categories])

    return (
        <form className="p-5 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                error={formState.errors.type}
                options={Object.keys(TRANSACTION_TYPES).map(type => ({
                    label: type,
                    value: type.toLowerCase()
                }))}
                register={register}
            />
            <Button>
                Add Transaction
            </Button>
        </form>
    )
}
export default Detail;
