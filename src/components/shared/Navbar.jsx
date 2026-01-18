'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDomain, MdMenu, MdClose, MdSearch, MdAdd, MdPerson, MdLogin, MdAppRegistration } from 'react-icons/md';
import { getCurrentUser } from '@/services/authService';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const currentUser = getCurrentUser();
        // eslint-disable-next-line
        setUser(currentUser);
    }, []);

    const navLinks = [
        { name: 'Buy', href: '/properties?status=sale' },
        { name: 'Rent', href: '/properties?status=rent' },
        { name: 'Sell', href: '/contact' },
        { name: 'Agents', href: '/agents' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/properties?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const textColorClass = 'text-charcoal dark:text-white';
    const logoColorClass = 'text-charcoal dark:text-white';

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 dark:bg-charcoal/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm"
        >
            <div className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between transition-all duration-300">
                {/* Left Section: Logo & Nav */}
                <div className="flex items-center gap-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="size-10 bg-primary flex items-center justify-center rounded-full text-white shadow-lg shadow-primary/20"
                        >
                            <MdDomain className="text-xl" />
                        </motion.div>
                        <span className={`text-xl font-black tracking-tight uppercase leading-none transition-colors group-hover:text-primary ${logoColorClass}`}>
                            UrbanNest
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold transition-colors hover:text-primary ${textColorClass}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-4">
                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800/50 rounded-full px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <MdSearch className="text-gray-400 text-xl shrink-0" />
                        <input
                            type="text"
                            placeholder="Search locations..."
                            className="bg-transparent border-none outline-none text-sm ml-2 w-full text-charcoal dark:text-white placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    {user ? (
                        <>
                            {/* List Property Button */}
                            <Link href="/dashboard/add-property">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden md:flex items-center gap-2 bg-primary hover:bg-yellow-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 transition-colors"
                                >
                                    <MdAdd className="text-lg" />
                                    <span>List Property</span>
                                </motion.button>
                            </Link>

                            {/* User Profile */}
                            <Link href="/dashboard" className="hidden md:flex">
                                <div className="size-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-primary flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt="Profile"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <MdPerson className="text-xl" />
                                    )}
                                </div>
                            </Link>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/login" className={`font-bold text-sm ${textColorClass} hover:text-primary transition-colors`}>
                                Sign In
                            </Link>
                            <Link href="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary hover:bg-yellow-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 transition-colors"
                                >
                                    Register
                                </motion.button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden text-2xl transition-colors ${textColorClass}`}
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
                        className="lg:hidden bg-white dark:bg-charcoal border-t border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="px-6 py-6 space-y-6">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3">
                                <MdSearch className="text-gray-400 text-xl" />
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    className="bg-transparent border-none outline-none text-sm ml-2 w-full text-charcoal dark:text-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>

                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-charcoal dark:text-white hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                                {user ? (
                                    <>
                                        <Link
                                            href="/dashboard/add-property"
                                            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all w-full"
                                        >
                                            <MdAdd className="text-xl" />
                                            List Property
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all w-full"
                                        >
                                            <MdPerson className="text-xl" />
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all w-full"
                                        >
                                            <MdLogin className="text-xl" />
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all w-full"
                                        >
                                            <MdAppRegistration className="text-xl" />
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
