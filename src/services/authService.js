import axiosInstance from '@/lib/axios';

// Login
export const login = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

// Register
export const register = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
};

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Get current user from API
export const getMe = async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
    const response = await axiosInstance.put('/auth/profile', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Update user in local storage but keep the token structure consistent if needed
        // Assuming response.data is the user object plus token
        const { token, ...user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};

// Google Auth (Login/Register)
export const googleAuth = async (googleData) => {
    const response = await axiosInstance.post('/auth/google', googleData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Clean up response structure for storage (exclude token itself from user object if structure demands)
        const { token, ...user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};

// Change Password
export const changePassword = async (passwordData) => {
    const response = await axiosInstance.put('/auth/change-password', passwordData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};
