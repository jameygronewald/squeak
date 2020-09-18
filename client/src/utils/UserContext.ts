import { createContext } from 'react';

interface ContextProps {
    handleLogin: (token: string) => void
    sessionToken: string
    setSessionToken: React.Dispatch<React.SetStateAction<string>>
    authStatus: { isAuthenticated: boolean }
    setAuthStatus: React.Dispatch<React.SetStateAction<{ isAuthenticated: boolean; }>>
}

export const UserContext = createContext<Partial<ContextProps>>({});