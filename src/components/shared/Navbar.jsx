'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDomain, MdMenu, MdClose, MdSearch, MdPerson, MdLogin, MdAppRegistration, MdAdd } from 'react-icons/md';
import { getCurrentUser } from '@/services/authService';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isHomePage = pathname === '/';
    // Transparent only on HomePage AND when not scrolled
    const isTransparent = isHomePage && !scrolled;

    useEffect(() => {
        const fetchUser = () => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Properties', href: '/properties' },
        { name: 'Agents', href: '/agents' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/properties?search=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${!isTransparent
                ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-2 shadow-sm'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Left: Logo */}
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <MdDomain className="text-3xl text-[#d4af37] drop-shadow-sm transition-transform group-hover:scale-110" />
                    <span className={`text-lg font-bold tracking-[0.2em] uppercase ${!isTransparent ? 'text-gray-900' : 'text-white'}`}>
                        UrbanNest
                    </span>
                </Link>

                {/* Center: Desktop Nav */}
                <div className="hidden lg:flex items-center gap-10 bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full border border-white/20">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-[#d4af37] ${!isTransparent ? 'text-gray-600' : 'text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-5 z-50">
                    {/* Search Icon (Desktop) */}
                    <button
                        aria-label="Search Properties"
                        className={`hidden md:flex items-center justify-center size-10 rounded-full transition-colors ${!isTransparent ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
                    >
                        <MdSearch className="text-xl" />
                    </button>

                    {user ? (
                        <>
                            <Link href="/dashboard" className="hidden md:flex">
                                <div className="flex items-center gap-2 overflow-hidden px-1">
                                    <div className="size-9 rounded-full bg-gray-200 border border-white shadow-inner relative overflow-hidden">
                                        {user.avatar ? (
                                            <Image src={user.avatar} alt="Profile" fill className="object-cover" />
                                        ) : (
                                            <MdPerson className="text-gray-500 text-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                    </div>
                                    <span className={`text-xs font-bold uppercase ${!isTransparent ? 'text-gray-900' : 'text-white'}`}>Account</span>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href="/login"
                                className={`text-[11px] font-bold uppercase tracking-widest hover:text-[#d4af37] transition-colors ${!isTransparent ? 'text-gray-900' : 'text-white'}`}
                            >
                                Sign In
                            </Link>
                            <Link href="/register">
                                <span className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${!isTransparent ? 'bg-[#1a1a1a] text-white hover:bg-[#d4af37]' : 'bg-white text-[#1a1a1a] hover:bg-white/90'}`}>
                                    Join
                                </span>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden text-2xl p-2 ${!isTransparent ? 'text-gray-900' : 'text-gray-900 md:text-white'}`}
                        aria-label="Toggle Menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-20 bg-white z-40 lg:hidden flex flex-col pt-6 px-6 pb-20 overflow-y-auto"
                    >
                        <form onSubmit={handleSearch} className="mb-8 relative" role="search">
                            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search properties..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-sm font-bold outline-none focus:border-[#d4af37] transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-black text-gray-900 hover:text-[#d4af37] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pt-10 border-t border-gray-100 flex flex-col gap-4">
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="bg-black text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest text-center"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="bg-gray-100 text-gray-900 w-full py-4 rounded-xl font-bold uppercase tracking-widest text-center"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="bg-black text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest text-center"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
