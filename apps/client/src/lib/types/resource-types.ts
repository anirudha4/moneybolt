export type Tag = {
    id: string
    name: string
    color: string
    organizationId: string
}
export type Transaction = {
    id?: string
    name: string
    amount: number
    date: string
    type: 'income' | 'expense' | 'investment'
    categoryId: string,
    walletId: string,
    category?: Category
    description?: string
}
export type Category = {
    id: string
    name: string;
    color: string;
}
export type Type = 'income' | 'expense' | 'investment'
export type Wallet = {
    id: string
    name: string
    amount: number
    userId: string
    organizationId: string
}