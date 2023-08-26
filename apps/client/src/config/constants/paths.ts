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
    DASHBOARD: '/app'
};

export const PRODUCT_LINKS = [
    makeOption('Features', PATHS.FEATURES),
    makeOption('Testimonials', PATHS.TESTIMONIALS),
    makeOption('Pricing', PATHS.PRICING),
]