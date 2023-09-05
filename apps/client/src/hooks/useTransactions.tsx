import { Statistic } from "@lib/types";
import { Transaction } from "@lib/types/resource-types";
import { getTransactionStatistics } from "@utils/transaction";
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
    showRecent?: boolean,
    id?: string
}
const OFFSET = 20

const useTransactions = ({ showRecent, id }: useTransactionsProps) => {
    // query client
    const queryClient = useQueryClient();
    const { data: transactions, isLoading, error } = useQuery(key, service.getTransactions, {
        refetchOnWindowFocus: true
    });
    const transaction = useMemo(() => transactions?.find(transaction => transaction.id === id),
        [transactions, id]);
    const { memoizedTransactions, statistics } = useMemo<{ memoizedTransactions: Transaction[], statistics: Statistic }>((): { memoizedTransactions: Transaction[], statistics: Statistic } => {
        const memoizedTransactions = [...transactions || []].sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        if (showRecent) {
            const transactionsCut = memoizedTransactions.slice(0, OFFSET);
            return {
                memoizedTransactions: transactionsCut,
                statistics: getTransactionStatistics(transactionsCut)
            }
        }
        const statistics = getTransactionStatistics(memoizedTransactions);
        return { memoizedTransactions, statistics };
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
        isCreatingTransaction,
        statistics,
        transaction
    }
}

export default useTransactions;