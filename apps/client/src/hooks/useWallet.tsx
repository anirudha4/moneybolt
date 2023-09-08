import { Wallet } from "@lib/types/resource-types";
import axios from "axios";
import { useQuery } from "react-query";

const key = 'wallets'
const service = {
    getWallets: async () => {
        const { data } = await axios.get<Wallet[]>('/api/wallets')
        return data;
    },
    createWallet: async (payload: Omit<Wallet, 'id'>) => {
        const { data } = await axios.post<Wallet>('/api/wallets', payload)
        return data;
    },
    updateTransaction: async (payload: Wallet) => {
        const { data } = await axios.put<Wallet>(`/api/wallets/${payload.id}`, payload)
        return data;
    }
}

type Props = {}
const useWallet = ({ }: Props) => {
    const { data: wallets, isLoading, error } = useQuery(key, service.getWallets, {
        refetchOnWindowFocus: false
    });

    return {
        wallets,
        isLoading,
        error
    }
}
export default useWallet