'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            toast.success('Successfully subscribed to our newsletter!');
            setEmail('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                        Join The Inner Circle
                    </h2>
                    <p className="text-gray-500 mb-10 font-light">
                        Receive early access to off-market listings and architectural insights within Urban Nest.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all bg-gray-50 placeholder:text-gray-400"
                            placeholder="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#d4af37] text-white font-bold px-8 py-4 rounded-full hover:bg-[#b08d2b] transition-all uppercase tracking-widest text-sm shadow-lg shadow-[#d4af37]/20 disabled:opacity-50"
                        >
                            {isLoading ? '...' : 'Subscribe'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
