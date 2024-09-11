import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import API from '../utilities/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initializeUser = async () => {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            if (token && userId) {
                try {
                    const response = await API.get(`/user/${userId}`, {
                        headers: { "x-auth-token": token }
                    });
                    const user = response.data?.data;
                    login(user);
                } catch (error) {
                    logout(); // Clear any invalid tokens
                }
            } else {
                setUser(null);
            }
        };

        initializeUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userId", userData.id);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

    const value = useMemo(
        () => ({ user, login, logout }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
