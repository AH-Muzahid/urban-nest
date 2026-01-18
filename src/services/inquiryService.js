import axiosInstance from '@/lib/axios';

// Create inquiry
export const createInquiry = async (inquiryData) => {
    const response = await axiosInstance.post('/inquiries', inquiryData);
    return response.data;
};

// Get sent inquiries
export const getSentInquiries = async () => {
    const response = await axiosInstance.get('/inquiries/sent');
    return response.data;
};

// Get received inquiries
export const getReceivedInquiries = async () => {
    const response = await axiosInstance.get('/inquiries/received');
    return response.data;
};

// Mark as read
export const markInquiryAsRead = async (id) => {
    const response = await axiosInstance.put(`/inquiries/${id}/read`);
    return response.data;
};

// Delete inquiry
export const deleteInquiry = async (id) => {
    const response = await axiosInstance.delete(`/inquiries/${id}`);
    return response.data;
};
