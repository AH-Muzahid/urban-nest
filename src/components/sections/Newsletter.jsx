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

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Successfully subscribed to our newsletter!');
            setEmail('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <section className="py-20 bg-primary/10 border-y border-primary/20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-extrabold tracking-tight mb-4">
                        JOIN THE INNER CIRCLE
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 font-light">
                        Receive early access to off-market listings and architectural insights.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            className="flex-1 px-6 py-4 rounded-xl border-gray-200 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:brightness-110 transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                        >
                            {isLoading ? 'Subscribing...' : 'Subscribe'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
