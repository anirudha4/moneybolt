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
    APP: '/app',
    DASHBOARD: '/app/dashboard',
    TRANSACTIONS: '/app/transactions',
    INVOICES: '/app/invoices',
    INTEGRATIONS: '/app/integrations',
    CONFIGURE: '/app/configurations',
};

export const PRODUCT_LINKS = [
    makeOption('Features', PATHS.FEATURES),
    makeOption('Testimonials', PATHS.TESTIMONIALS),
    makeOption('Pricing', PATHS.PRICING),
]