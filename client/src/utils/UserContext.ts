import { createContext } from 'react';

interface ContextProps {
    handleLogin: (token: string) => void
    sessionToken: string
    setSessionToken: React.Dispatch<React.SetStateAction<string>>
    userData: object
    setUserData: React.Dispatch<React.SetStateAction<{ isAuthenticated: boolean; }>>
}

export const UserContext = createContext<Partial<ContextProps>>({});