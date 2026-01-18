'use client';

import { useState } from 'react';
import { createInquiry } from '@/services/inquiryService';
import { MdCalendarToday, MdSend } from 'react-icons/md';
// Using a toast or alert for feedback would be good, but simple alert for now
// or passing a callback for success

const ContactAgentForm = ({ propertyId, ownerId }) => {
    const [formData, setFormData] = useState({
        message: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createInquiry({
                property: propertyId,
                receiver: ownerId,
                message: formData.message,
                phone: formData.phone
            });
            setSuccess(true);
            setFormData({ message: '', phone: '' });
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    AG
                </div>
                <div>
                    <h4 className="font-black text-lg">Listing Agent</h4>
                    <p className="text-gray-400 text-sm">Premier Luxury Specialist</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <input
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                    placeholder="Your Phone Number"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <textarea
                    className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                    placeholder="I'm interested in this property..."
                    rows="3"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>

                {error && <p className="text-red-500 text-xs">{error}</p>}
                {success && <p className="text-green-500 text-xs">Message sent successfully!</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-background-dark font-black py-4 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? 'Sending...' : <><MdSend className="text-xl" /> Send Message</>}
                </button>
            </form>

            <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                <MdCalendarToday className="text-xl" /> Schedule Viewing
            </button>
        </div>
    );
};

export default ContactAgentForm;
