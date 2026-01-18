import axiosInstance from '@/lib/axios';

// Get reviews for a property
export const getPropertyReviews = async (propertyId) => {
    const response = await axiosInstance.get(`/properties/${propertyId}/reviews`);
    return response.data;
};

// Add a review
export const addReview = async (propertyId, reviewData) => {
    const response = await axiosInstance.post(`/properties/${propertyId}/reviews`, reviewData);
    return response.data;
};

// Delete a review
export const deleteReview = async (reviewId) => {
    const response = await axiosInstance.delete(`/reviews/${reviewId}`);
    return response.data;
};
