export type Tag = {
    id: string
    name: string
    color: string
    organizationId: string
}
export type Transaction = {
    name: string
    amount: number
    date: string
    type: string
    category: string
    tag: Tag
}
