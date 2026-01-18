'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { MdMail } from 'react-icons/md';
import { getReceivedInquiries } from '@/services/inquiryService';

const ActivityPage = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getReceivedInquiries();
                setActivities(data);
            } catch (error) {
                console.error('Failed to fetch activities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div className="bg-gray-50 dark:bg-charcoal min-h-screen font-display text-charcoal dark:text-gray-100">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">Activity Log</h1>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    {loading ? (
                        <p>Loading activity...</p>
                    ) : activities.length === 0 ? (
                        <p className="text-gray-500">No recent activity found.</p>
                    ) : (
                        <div className="space-y-6">
                            {activities.map((item) => (
                                <div key={item._id} className="flex gap-4 border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                                    <div className="size-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                        <MdMail />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold">New Inquiry Received</h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            For property: <span className="font-bold">{item.property?.title || 'Unknown Property'}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {new Date(item.createdAt).toLocaleString()}
                                        </p>
                                        <div className="mt-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                                            &quot;{item.message}&quot;
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ActivityPage;
