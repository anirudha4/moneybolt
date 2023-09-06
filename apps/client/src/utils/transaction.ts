import { Transaction } from "@lib/types/resource-types";

export const getTransactionStatistics = (transactions: Transaction[]) => {
    const income = transactions.filter((transaction) => transaction.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter((transaction) => transaction.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    const investment = transactions.filter((transaction) => transaction.type === 'investment').reduce((acc, curr) => acc + curr.amount, 0);
    const total = income - (expense + investment);
    return { total, income, expense, investment };
}

export const formatCurrency = (amount: number = 0, currency: string = 'INR', lang = 'en-IN') => {
    return new Intl.NumberFormat(lang, { style: 'currency', currency }).format(amount);
}
