import { Transaction } from "@lib/types/resource-types";
import axios from "axios";
import { useQuery } from "react-query";

const key = 'transactions'
const getTransactions = async () => axios.get<{ data: Transaction[] }>('/api/transactions')


const useTransaction = () => {
    const { data: transactions, isLoading, error } = useQuery(key, getTransactions, {
        refetchOnWindowFocus: true
    });
    return { transactions, isLoading, error }
}

export default useTransaction;