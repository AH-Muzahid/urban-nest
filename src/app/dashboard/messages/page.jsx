'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSentInquiries, getReceivedInquiries, markInquiryAsRead, deleteInquiry } from '@/services/inquiryService';
import { MdInbox, MdOutbox, MdMarkEmailRead, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

const MessagesPage = () => {
    const [activeTab, setActiveTab] = useState('received');
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = useCallback(async () => {
        setLoading(true);
        try {
            const data = activeTab === 'received'
                ? await getReceivedInquiries()
                : await getSentInquiries();
            setInquiries(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    const handleRead = async (id) => {
        try {
            await markInquiryAsRead(id);
            fetchInquiries();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id) => {
        toast((t) => (
            <div className="flex flex-col gap-3 min-w-[280px]">
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">Delete Message?</h3>
                    <p className="text-xs text-gray-500 mt-1">Are you sure you want to permanently delete this message?</p>
                </div>
                <div className="flex gap-2 justify-end mt-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            confirmDelete(id);
                            toast.dismiss(t.id);
                        }}
                        className="px-3 py-1.5 text-xs font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 8000,
            position: 'top-center',
            className: "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 !shadow-2xl !rounded-2xl"
        });
    };

    const confirmDelete = async (id) => {
        try {
            await deleteInquiry(id);
            setInquiries(prev => prev.filter(inquiry => inquiry._id !== id));
            toast.success('Message deleted successfully');
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.response?.data?.message || 'Failed to delete message');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] p-6 text-charcoal dark:text-white">
            <h1 className="text-3xl font-bold mb-8">Messages</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('received')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'received' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-500'}`}
                >
                    <MdInbox /> Inbox
                </button>
                <button
                    onClick={() => setActiveTab('sent')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${activeTab === 'sent' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-500'}`}
                >
                    <MdOutbox /> Sent
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center py-12">Loading messages...</div>
            ) : inquiries.length === 0 ? (
                <div className="text-center py-12 text-gray-400">No messages found.</div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 ${inquiry.isRead ? 'border-gray-200 dark:border-gray-700' : 'border-primary'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{inquiry.property?.title || 'Unknown Property'}</h3>
                                    <p className="text-xs text-gray-500">
                                        {activeTab === 'received' ? `From: ${inquiry.sender?.name} (${inquiry.sender?.email})` : `To: ${inquiry.receiver?.name} (${inquiry.receiver?.email})`}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {activeTab === 'received' && !inquiry.isRead && (
                                        <button onClick={() => handleRead(inquiry._id)} className="text-primary hover:text-primary/80 p-2 hover:bg-primary/10 rounded-full transition-colors" title="Mark as Read">
                                            <MdMarkEmailRead className="text-2xl" />
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(inquiry._id)} className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="Delete">
                                        <MdDelete className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">{inquiry.message}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>Phone: {inquiry.phone}</span>
                                <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
