import { Transaction } from "@lib/types/resource-types";

export const getTransactionStatistics = (transactions: Transaction[]) => {
    const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    const income = transactions.filter((transaction) => transaction.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter((transaction) => transaction.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const investment = transactions.filter((transaction) => transaction.type === 'investment').reduce((acc, curr) => acc + curr.amount, 0);
    return { total, income, expense, investment };
}