'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAuthenticated, logout } from '@/services/authService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            if (isAuthenticated()) {
                const currentUser = getCurrentUser();
                setUser(currentUser);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        router.push('/login');
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        logout: handleLogout,
        refreshUser: checkAuth,
    };
};
