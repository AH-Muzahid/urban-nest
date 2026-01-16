'use client';

import { motion } from 'framer-motion';
import { MdLocationOn, MdPayments, MdHomeWork, MdSearch } from 'react-icons/md';

const HeroSection = () => {
    return (
        <section className="relative h-[90vh] min-h-[700px] w-full flex items-center justify-center pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtCMpcda56VkVQTjG1NzjBsfTwz2rz2OoPMpeEcP2TRRvsliwyRM4Yq8VX-Sy2CuLkuD_tw2unTmTA3jmmUtd_B4j-lpzq4R1BJnjxxwSXZLHCfAkTmzguAFOpH8NoC3677dp0FBdmMivasxu5X2Tu_KYKthtsDn2OMY0GHm44mmXD5vwOKY1lxu1CKY5OP3xH8FnroZVIDDU5vaUhkc4ABWCSNmcnOuyTlCBfTwDjRcGC9UuTpQXMJBLiNfHUdToatZCvXqb1XeaD')`,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                >
                    Exclusivity • Luxury • Privacy
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]"
                >
                    FIND YOUR SANCTUARY
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/80 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Discover curated luxury properties in the world&apos;s most desirable locations. Where architectural excellence meets timeless elegance.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl md:rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto"
                >
                    {/* Location Input */}
                    <div className="flex-1 flex items-center px-6 py-4 w-full group relative">
                        <MdLocationOn className="text-white/70 mr-3 text-2xl" />
                        <input
                            className="bg-transparent border-none focus:ring-0 w-full placeholder:text-white/50 text-white font-bold outline-none"
                            placeholder="Location"
                            type="text"
                        />
                        <div className="absolute bottom-2 left-6 right-6 h-px bg-white/10 group-focus-within:bg-primary transition-colors"></div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-white/10"></div>

                    {/* Price Range Input */}
                    <div className="flex-1 flex items-center px-6 py-4 w-full group relative">
                        <MdPayments className="text-white/70 mr-3 text-2xl" />
                        <input
                            className="bg-transparent border-none focus:ring-0 w-full placeholder:text-white/50 text-white font-bold outline-none"
                            placeholder="Price Range"
                            type="text"
                        />
                        <div className="absolute bottom-2 left-6 right-6 h-px bg-white/10 group-focus-within:bg-primary transition-colors"></div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-white/10"></div>

                    {/* Property Type Select */}
                    <div className="flex-1 flex items-center px-6 py-4 w-full group relative">
                        <MdHomeWork className="text-white/70 mr-3 text-2xl" />
                        <select className="bg-transparent border-none focus:ring-0 w-full text-white/50 font-bold outline-none cursor-pointer appearance-none">
                            <option className="text-charcoal bg-white">Property Type</option>
                            <option className="text-charcoal bg-white">Penthouse</option>
                            <option className="text-charcoal bg-white">Villa</option>
                            <option className="text-charcoal bg-white">Estate</option>
                        </select>
                        <div className="absolute bottom-2 left-6 right-6 h-px bg-white/10 group-focus-within:bg-primary transition-colors"></div>
                    </div>

                    {/* Search Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full md:w-auto bg-primary hover:bg-[#b08d2b] text-white font-bold px-10 py-5 rounded-xl md:rounded-full flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                        <MdSearch className="text-xl" />
                        SEARCH
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
