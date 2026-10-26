import Splash from "@components/common/Splash";
import { PATHS } from "@config/constants/paths";
import { getUser, login, logout, signup } from "@lib/auth";
import { ContextType } from "@lib/types/contexts";
import { Category } from "@lib/types/resource-types";
import { trackEvent } from "@utils/analytics";
import { isAxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export type UserType = {
    name: string,
    email: string,
    avatarUrl?: string
    organizationId?: string,
    organization?: {
        id: string,
        name: string
    },
    categories?: Category[]
};

type Props = {
    children: ReactNode
}


type AuthMode = 'login' | 'signup';

// Pendo: report a rejected login/signup request without any credentials, only a sanitized reason
const trackAuthenticationFailed = (authMode: AuthMode, error: unknown) => {
    const message: unknown = isAxiosError(error) ? error.response?.data?.message : undefined;
    const errorMessage = Array.isArray(message) ? message.join(', ') : typeof message === 'string' ? message : 'Something went wrong!';
    trackEvent('authentication_failed', {
        auth_mode: authMode,
        error_message: errorMessage.slice(0, 100),
        status_code: isAxiosError(error) ? error.response?.status ?? 0 : 0
    });
}

export const AuthContext = createContext<ContextType | null>(null);

const AuthProvider = ({ children }: Props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserType | null>(null);
    const [error, setError] = useState<string | null>(null);

    // setters
    const clearError = () => setError(null);

    // queries and mutations
    const { isLoading } = useQuery('auth/me', getUser, {
        onSettled(response) {
            if (response?.data) {
                const { organization: { category, ...organization }, ...user } = response.data;
                setUser({
                    ...user,
                    categories: category,
                    organization
                })
            }
        },
        retry: false,
        refetchOnWindowFocus: false
    });

    const { mutate: logoutMutation, isLoading: logoutLoading } = useMutation('auth/logout', logout, {
        onSettled() {
            window.location.href = import.meta.env.BASE_URL
        },
    });

    const { mutate: signupMutation, isLoading: isSigningUp } = useMutation('signup', signup, {
        onSettled(response) {
            const data = response?.data.user;
            if (data) {
                // Pendo: account successfully created (fires before redirect to login)
                trackEvent('signup_completed', {
                    organizationId: data.organizationId ?? 'unknown',
                    signup_method: 'email_password'
                });
                navigate(PATHS.AUTH + '?type=login')
            }
        },
        onError(error) {
            trackAuthenticationFailed('signup', error);
            if (isAxiosError(error)) {
                setError(error.response?.data?.message)
                return error.response?.data?.message
            }
            setError('Something went wrong!');
        }
    });
    const { mutate: loginMutation, isLoading: isLoggingIn } = useMutation('login', login, {
        onSettled(response) {
            const data = response?.data?.user

            if (data) {
                setUser(data);
                setError(null);
                window.location.href = window.location.origin + PATHS.DASHBOARD
            }
        },
        onError(error) {
            trackAuthenticationFailed('login', error);
            if (isAxiosError(error)) {
                setError(error.response?.data?.message)
                return error.response?.data?.message
            }
            setError('Something went wrong!');
        },
    });

    // handlers
    const loginWithEmailAndPassword = async (credentials: Omit<UserType, "name">) => {
        return await loginMutation(credentials);
    }

    const signupWithEmailAndPassword = async (credentials: UserType) => {
        return await signupMutation(credentials);
    }

    // prepare values
    const values: ContextType = {
        loginWithEmailAndPassword,
        signupWithEmailAndPassword,
        error,
        user,
        isLoggingIn,
        isSigningUp,
        logoutMutation,
        logoutLoading,
        clearError
    };
    if (isLoading) {
        return <Splash />
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider