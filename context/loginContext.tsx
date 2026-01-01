import { useState, createContext } from 'react';
import { type User } from 'firebase/auth';

interface LoginContextType {
    isLoggedIn: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    login: () => void;
    logout: () => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
            {children}
        </LoginContext.Provider>
    );
};