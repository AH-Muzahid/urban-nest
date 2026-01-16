'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdFormatQuote } from 'react-icons/md';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            quote: "The experience with UrbanNest was seamless. They didn't just find me a house; they found a masterpiece that perfectly mirrors my lifestyle and aspirations.",
            author: 'Alexander Thorne',
            position: 'Tech Entrepreneur & Investor',
        },
        {
            id: 2,
            quote: "UrbanNest's attention to detail and understanding of luxury real estate is unmatched. They transformed my property search into an extraordinary journey.",
            author: 'Sophia Martinez',
            position: 'CEO & Philanthropist',
        },
        {
            id: 3,
            quote: "Working with UrbanNest was a revelation. Their curated selection and personalized service exceeded all my expectations.",
            author: 'James Wellington',
            position: 'Investment Banker',
        },
    ];

    return (
        <section className="py-24 max-w-5xl mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <MdFormatQuote className="text-primary text-6xl mb-8 mx-auto" />
            </motion.div>

            <div className="space-y-8 min-h-[250px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-medium leading-relaxed italic text-gray-700 dark:text-gray-300 mb-8">
                            &ldquo;{testimonials[activeIndex].quote}&rdquo;
                        </h3>
                        <div>
                            <p className="font-bold uppercase tracking-[0.2em] text-primary">
                                {testimonials[activeIndex].author}
                            </p>
                            <p className="text-gray-500 text-sm mt-1 uppercase">
                                {testimonials[activeIndex].position}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-12">
                {testimonials.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`size-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary w-8' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
