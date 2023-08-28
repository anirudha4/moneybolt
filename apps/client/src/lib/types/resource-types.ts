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
    date: string
    type: string
    category: string
    tag: Tag
}
export type Category = {
    id: string
    name: string;
    color: string;
}