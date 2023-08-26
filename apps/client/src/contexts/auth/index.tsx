import Splash from "@components/common/Splash";
import { PATHS } from "@config/constants/paths";
import { getUser, login, logout, signup } from "@lib/auth";
import { ContextType } from "@lib/types/contexts";
import { isAxiosError } from "axios";
import { ReactNode, createContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export type UserType = {
    name: string,
    email: string,
    avatarUrl?: string
    organizationId?: string
};

type Props = {
    children: ReactNode
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
                setUser(response?.data)
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
                navigate(PATHS.AUTH + '?type=login')
            }
        },
        onError(error) {
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
            console.log(data);

            if (data) {
                setUser(data);
                setError(null);
                navigate(PATHS.DASHBOARD);
            }
        },
        onError(error) {
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