import { makeOption } from "@utils/index";

export const PATHS = {
    // auth routes
    AUTH: '/auth',
    // unprotected rout
    HOME: '/',
    FEATURES: '#features',
    TESTIMONIALS: '#testimonials',
    PRICING: '#pricing',
    // protected routes
    ACCOUNT: '/accounts',
    WORKSPACE: '/preferences',
    APP: '/app',

    DASHBOARD: '/app/dashboard',
    TRANSACTION_FROM_DASHBOARD: '/app/dashboard/view/:transaction_id',

    TRANSACTIONS: '/app/transactions',
    TRANSACTION_FROM_TRANSACTION: '/app/transactions/view/:transaction_id',

    INVOICES: '/app/invoices',
    TRANSACTION_FROM_INVOICE: '/app/invoices/view/:invoice_id',

    INTEGRATIONS: '/app/integrations',
    CONFIGURE: '/app/configurations',
};

export const PRODUCT_LINKS = [
    makeOption('Features', PATHS.FEATURES),
    makeOption('Testimonials', PATHS.TESTIMONIALS),
    makeOption('Pricing', PATHS.PRICING),
]