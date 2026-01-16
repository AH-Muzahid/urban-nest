'use client';

import { motion } from 'framer-motion';
import { MdVerifiedUser, MdWorkspacePremium } from 'react-icons/md';

const WhyChooseUs = () => {
    const features = [
        {
            icon: MdVerifiedUser,
            title: 'Discretion',
            description: 'Unparalleled privacy for our distinguished global clientele.',
        },
        {
            icon: MdWorkspacePremium,
            title: 'Expertise',
            description: 'Decades of insight in high-yield luxury real estate markets.',
        },
    ];

    return (
        <section className="py-32 bg-charcoal text-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                        Our Philosophy
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
                        REDEFINING THE ART OF MODERN LIVING
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-loose mb-10">
                        UrbanNest isn&apos;t just a real estate platform; it&apos;s a curator of exceptional lifestyles. We specialize in properties that challenge the ordinary and define the future of architectural elegance.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="space-y-4"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="text-primary"
                                >
                                    <feature.icon className="text-4xl" />
                                </motion.div>
                                <h4 className="font-bold uppercase tracking-widest text-sm">{feature.title}</h4>
                                <p className="text-gray-500 text-xs">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1SRCTunqYKayJR7s_2RkMwP69RkZ_KsyuOusYKixi8LG1EpRKWX2-_pW2x8rrv8PvpcjnL14Qi-fKwXqqhkeypnaIzocpdaTI-y7VgYOdBX3Z4t6yVtGX-gFlKPLZHI8xUnv-QzqzbyO8NLJ1HF_GE_6bV6KGF9xX5zWyReJQOJw096u7ryi9DjSkkER7pN3PcFLFFx2Tmjs8bFvAjokigDx0q6m0kPmnFO7BFW98Oi-WYFAjP6e0kb9rZBLQrHq5pi2BWqNWyYTV')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Stats Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-2xl hidden md:block shadow-2xl"
                    >
                        <p className="text-charcoal font-black text-5xl">25+</p>
                        <p className="text-charcoal/80 font-bold uppercase tracking-widest text-xs mt-2">
                            Years of Excellence
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
