import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(Cookies.get('adminToken'));

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/users/profile');
            setUser(response.data.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            if (error.response?.status === 401) {
                logout();
            } else {
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/users/login', { email, password });
            const { token: newToken, user: userData } = response.data.data;

            Cookies.set('adminToken', newToken, {
                expires: 0.25,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });

            Cookies.set('adminUser', JSON.stringify(userData), {
                expires: 0.25,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            setToken(newToken);
            setUser(userData);

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        Cookies.remove('adminToken', { path: '/' });
        Cookies.remove('adminUser', { path: '/' });

        delete axiosInstance.defaults.headers.common['Authorization'];

        setToken(null);
        setUser(null);
        setLoading(false);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!token && !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};