'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDomain, MdMenu, MdClose, MdAddCircle } from 'react-icons/md';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Residential', href: '/properties' },
        { name: 'Commercial', href: '/properties' },
        { name: 'Luxury', href: '/properties' },
        { name: 'About Us', href: '/#about' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/90 dark:bg-charcoal/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm'
                : 'bg-transparent backdrop-blur-none border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between transition-all duration-300">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="size-11 bg-primary flex items-center justify-center rounded-xl text-white shadow-xl shadow-primary/20"
                    >
                        <MdDomain className="text-2xl" />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tight uppercase leading-none text-charcoal dark:text-white group-hover:text-primary transition-colors">
                            UrbanNest
                        </span>
                        <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                            Luxury Estates
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className={`text-xs font-bold uppercase tracking-widest relative group transition-colors ${isScrolled ? 'text-charcoal dark:text-gray-200' : 'text-white'
                                    }`}
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className={`hidden md:flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-colors hover:text-primary ${isScrolled ? 'text-charcoal dark:text-white' : 'text-white'}`}>
                        Dashboard
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-charcoal font-bold px-7 py-3 rounded-full shadow-lg shadow-black/5 transition-all uppercase text-xs tracking-widest hover:bg-primary hover:text-white"
                    >
                        Inquire
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden text-2xl transition-colors ${isScrolled ? 'text-charcoal dark:text-white' : 'text-white'}`}
                    >
                        {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-charcoal border-t border-gray-100 dark:border-gray-800"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-base font-bold text-charcoal dark:text-white hover:text-primary transition-colors uppercase tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                <Link href="/dashboard" className="block w-full text-center text-sm font-bold bg-primary text-white px-6 py-4 rounded-xl hover:bg-opacity-90 transition-all uppercase tracking-widest">
                                    Access Dashboard
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
