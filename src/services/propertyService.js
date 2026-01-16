import axiosInstance from '@/lib/axios';

// Get all properties
export const getProperties = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axiosInstance.get(`/properties?${queryParams}`);
    return response.data;
};

// Get property by ID
export const getPropertyById = async (id) => {
    const response = await axiosInstance.get(`/properties/${id}`);
    return response.data;
};

// Get user's properties
export const getUserProperties = async () => {
    const response = await axiosInstance.get('/properties/user/my-properties');
    return response.data;
};

// Add new property
export const addProperty = async (propertyData) => {
    const response = await axiosInstance.post('/properties', propertyData);
    return response.data;
};

// Update property
export const updateProperty = async (id, propertyData) => {
    const response = await axiosInstance.put(`/properties/${id}`, propertyData);
    return response.data;
};

// Delete property
export const deleteProperty = async (id) => {
    const response = await axiosInstance.delete(`/properties/${id}`);
    return response.data;
};

// Search properties
export const searchProperties = async (searchTerm) => {
    const response = await axiosInstance.get(`/properties/search?q=${searchTerm}`);
    return response.data;
};

// Get featured properties
export const getFeaturedProperties = async () => {
    const response = await axiosInstance.get('/properties/featured');
    return response.data;
};
