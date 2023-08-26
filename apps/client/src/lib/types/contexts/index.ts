import { UserType } from "@contexts/auth";

export type ContextType = {
    user: UserType | null,
    error?: string | null,
    isLoggingIn: boolean,
    isSigningUp: boolean,
    logoutLoading: boolean,
    loginWithEmailAndPassword: (user: Omit<UserType, 'name'>) => Promise<void>,
    signupWithEmailAndPassword: (user: UserType) => Promise<void>,
    logoutMutation: () => void,
    clearError: () => void
}