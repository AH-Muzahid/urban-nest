'use client';
import { motion } from 'framer-motion';
import { MdEmail, MdPhone, MdLocationOn, MdArrowForward } from 'react-icons/md';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="flex flex-col lg:flex-row min-h-screen pt-20">
                {/* Left: Contact Info (Dark) */}
                <div className="w-full lg:w-1/2 bg-[#1a1a1a] text-white p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute right-0 top-0 size-96 bg-[#d4af37] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        <span className="text-[#d4af37] font-bold text-xs tracking-[0.3em] uppercase mb-6 block">Concierge</span>
                        <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
                            Begin Your <br /> <span className="font-serif italic">Acquisition</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-16 max-w-md leading-relaxed font-light">
                            Whether you are selling a trophy asset or seeking a private residence, our global advisors are at your disposal.
                        </p>

                        <div className="space-y-10">
                            <div className="flex items-start gap-6 group">
                                <div className="size-12 rounded-full border border-white/20 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300">
                                    <MdLocationOn className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Global Headquarters</h3>
                                    <p className="text-gray-400 font-light">1100 Avenue of the Americas<br />New York, NY 10036</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="size-12 rounded-full border border-white/20 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300">
                                    <MdEmail className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Private Client Inquiries</h3>
                                    <p className="text-gray-400 font-light">concierge@urbannest.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="size-12 rounded-full border border-white/20 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300">
                                    <MdPhone className="text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-1">24/7 Advisory</h3>
                                    <p className="text-gray-400 font-light">+1 (212) 555-0199</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Form (Light) */}
                <div className="w-full lg:w-1/2 bg-white p-12 lg:p-24 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-xl mx-auto w-full"
                    >
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-[#d4af37] transition-colors">First Name</label>
                                    <input type="text" className="w-full border-b border-gray-200 py-3 text-[#1a1a1a] outline-none focus:border-[#d4af37] transition-colors bg-transparent placeholder-transparent" placeholder="Name" />
                                </div>
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-[#d4af37] transition-colors">Last Name</label>
                                    <input type="text" className="w-full border-b border-gray-200 py-3 text-[#1a1a1a] outline-none focus:border-[#d4af37] transition-colors bg-transparent placeholder-transparent" placeholder="Last Name" />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-[#d4af37] transition-colors">Email Address</label>
                                <input type="email" className="w-full border-b border-gray-200 py-3 text-[#1a1a1a] outline-none focus:border-[#d4af37] transition-colors bg-transparent placeholder-transparent" placeholder="email@example.com" />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-[#d4af37] transition-colors">Phone (Optional)</label>
                                <input type="tel" className="w-full border-b border-gray-200 py-3 text-[#1a1a1a] outline-none focus:border-[#d4af37] transition-colors bg-transparent placeholder-transparent" placeholder="+1..." />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 group-focus-within:text-[#d4af37] transition-colors">Message</label>
                                <textarea rows="4" className="w-full border-b border-gray-200 py-3 text-[#1a1a1a] outline-none focus:border-[#d4af37] transition-colors bg-transparent resize-none" placeholder="I am interested in..." />
                            </div>

                            <div className="pt-8">
                                <button className="group flex items-center gap-4 bg-[#1a1a1a] text-white px-10 py-5 rounded-none hover:bg-[#d4af37] transition-all duration-300 w-full md:w-auto justify-center">
                                    <span className="font-bold uppercase tracking-[0.2em] text-sm">Send Message</span>
                                    <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
