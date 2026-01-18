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
        <section id="about" className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Image Section - Left (Architecture) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-full lg:w-3/5 h-[500px] lg:h-[700px] relative z-0"
                    >
                        <div
                            className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                            style={{
                                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1SRCTunqYKayJR7s_2RkMwP69RkZ_KsyuOusYKixi8LG1EpRKWX2-_pW2x8rrv8PvpcjnL14Qi-fKwXqqhkeypnaIzocpdaTI-y7VgYOdBX3Z4t6yVtGX-gFlKPLZHI8xUnv-QzqzbyO8NLJ1HF_GE_6bV6KGF9xX5zWyReJQOJw096u7ryi9DjSkkER7pN3PcFLFFx2Tmjs8bFvAjokigDx0q6m0kPmnFO7BFW98Oi-WYFAjP6e0kb9rZBLQrHq5pi2BWqNWyYTV')`
                            }}
                        />
                        {/* Decorative Gold Frame */}
                        <div className="absolute top-10 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#d4af37] hidden lg:block opacity-60"></div>

                        {/* 25 Yrs Badge (Repositioned) */}
                        <div className="absolute bottom-0 right-0 lg:right-32 bg-white p-6 shadow-none border-t border-l border-gray-100 hidden lg:block">
                            <p className="text-[#d4af37] font-black text-3xl">25+</p>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Years</p>
                        </div>
                    </motion.div>

                    {/* Content Section - Right (Floating Box) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 bg-white p-8 md:p-16 shadow-2xl z-10 lg:-ml-20 mt-[-80px] lg:mt-0 relative"
                    >
                        {/* Header */}
                        <span className="text-[#d4af37] font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Our Philosophy</span>
                        <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-[0.9] text-gray-900">
                            ELEVATING <br />
                            <span className="font-light text-gray-300">THE STANDARD</span>
                        </h2>

                        <p className="text-gray-500 mb-12 leading-loose font-light text-sm">
                            UrbanNest creates extraordinary environments for those who seek the exceptional. Our approach combines architectural heritage with modern innovation to shape the way you live.
                        </p>

                        {/* Features List */}
                        <div className="space-y-8">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-5 items-start">
                                    <div className="bg-gray-50 p-3 h-fit rounded-[1px] text-[#d4af37]">
                                        <f.icon className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase tracking-widest mb-2 text-gray-900">{f.title}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed py-1">{f.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
