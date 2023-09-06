import { useMemo } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Statistic } from "@lib/types";
import { Transaction, TransactionWithCategory } from "@lib/types/resource-types";
import { getTransactionStatistics } from "@utils/transaction";
import useAuth from "./useAuth";

const key = 'transactions'
const service = {
    getTransactions: async () => {
        const { data } = await axios.get<Transaction[]>('/api/transactions')
        return data;
    },
    createTransaction: async (payload: Omit<Transaction, 'id'>) => {
        const { data } = await axios.post<Transaction>('/api/transactions', payload)
        return data;
    },
    updateTransaction: async (payload: Transaction) => {
        const { data } = await axios.put<Transaction>(`/api/transactions/${payload.id}`, payload)
        return data;
    }
}

type useTransactionsProps = {
    showRecent?: boolean,
    id?: string
}
const OFFSET = 20;

const useTransactions = ({ showRecent, id }: useTransactionsProps) => {
    const { user } = useAuth();
    // query client
    const queryClient = useQueryClient();
    const { data: transactions, isLoading, error } = useQuery(key, service.getTransactions, {
        refetchOnWindowFocus: false
    });
    const transaction: TransactionWithCategory = useMemo<TransactionWithCategory>((): TransactionWithCategory => {
        let rawTransaction = transactions?.find(transaction => transaction.id === id)
        if (rawTransaction) {
            const category = user?.categories?.find(category => category.id === rawTransaction?.categoryId);
            
            return {
                ...rawTransaction,
                category
            }
        }
        return null;
    }, [transactions, id]);
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
                queryClient.setQueryData<Transaction[]>(key, (oldData = []) => {
                    return [...oldData, transaction]
                })
            }
        }
    });

    const { mutate: updateTransactionMutation, isLoading: isUpdatingTransaction } = useMutation(['update-transaction', { id }], service.updateTransaction, {
        onSettled: (transaction) => {
            if (transaction) {
                queryClient.setQueryData<Transaction[]>(key, (oldData = []) => {
                    return oldData.map(oldTransaction => {
                        if (oldTransaction.id === transaction.id) {
                            return transaction
                        }
                        return oldTransaction
                    })
                })
            }
        }
    });

    const updateTransaction = (payload: Transaction) => updateTransactionMutation(payload)


    return {
        transactions: memoizedTransactions,
        isLoading,
        error,
        createTransaction,
        isCreatingTransaction,
        updateTransaction,
        isUpdatingTransaction,
        statistics,
        transaction
    }
}

export default useTransactions;