export type Tag = {
    id: string
    name: string
    color: string
    organizationId: string
}
export type Transaction = {
    id: string
    name: string
    amount: number
    date: Date
    type: 'income' | 'expense' | 'investment'
    categoryId: string
}
export type Category = {
    id: string
    name: string;
    color: string;
}