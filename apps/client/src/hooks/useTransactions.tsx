import { Transaction } from "@lib/types/resource-types";
import axios from "axios";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const key = 'transactions'
const service = {
    getTransactions: async () => {
        const { data } = await axios.get<Transaction[]>('/api/transactions')
        return data;
    },
    createTransaction: async (payload: Omit<Transaction, 'id'>) => {
        const { data } = await axios.post<Transaction>('/api/transactions', payload)
        return data;
    }
}

type useTransactionsProps = {
    showRecent?: boolean
}
const OFFSET = 20

const useTransactions = ({ showRecent }: useTransactionsProps) => {
    // query client
    const queryClient = useQueryClient();
    const { data: transactions, isLoading, error } = useQuery(key, service.getTransactions, {
        refetchOnWindowFocus: true
    });

    const memoizedTransactions = useMemo(() => {
        const sortedTransactions = [...transactions || []].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        if (showRecent) {
            return sortedTransactions.slice(0, OFFSET)
        }
        return sortedTransactions;
    }, [transactions])

    const { mutate: createTransaction, isLoading: isCreatingTransaction } = useMutation('create-transaction', service.createTransaction, {
        onSettled: (transaction) => {
            if (transaction) {
                // set old data to empty array in type script
                queryClient.setQueryData<Transaction[]>(key, (oldData = []) => {
                    return [...oldData, transaction]
                })
            }
        }
    });

    return {
        transactions: memoizedTransactions,
        isLoading,
        error,
        createTransaction,
        isCreatingTransaction
    }
}

export default useTransactions;