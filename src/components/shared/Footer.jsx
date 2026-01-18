'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdDomain, MdPublic, MdShare, MdCall, MdMail, MdLocationOn } from 'react-icons/md';

const Footer = () => {
    const portfolioLinks = [
        { name: 'Private Villas', href: '/properties' },
        { name: 'Urban Penthouses', href: '/properties' },
        { name: 'Coastal Estates', href: '/properties' },
        { name: 'Commercial Towers', href: '/properties' },
    ];

    const companyLinks = [
        { name: 'About UrbanNest', href: '#' },
        { name: 'Global Partners', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Journal', href: '#' },
    ];

    const socialLinks = [
        { icon: MdPublic, href: '#', label: 'Website' },
        { icon: MdShare, href: '#', label: 'Share' },
    ];

    return (
        <footer className="bg-[#1a1a1a] text-white pt-32 pb-10 relative overflow-hidden">
            {/* Massive Watermark */}
            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03]">
                <span className="text-[12rem] md:text-[20rem] font-bold tracking-tighter whitespace-nowrap">
                    URBAN NEST
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
                    {/* Brand Section (4 cols) */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-10 bg-[#d4af37] flex items-center justify-center rounded text-white shadow-lg shadow-[#d4af37]/20">
                                <MdDomain className="text-2xl" />
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter uppercase text-white">UrbanNest</h2>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
                            The world&apos;s premier destination for luxury architectural assets. Specializing in discrete high-value transactions for the discerning few.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="size-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 bg-gray-900/50"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-lg" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Section (8 cols split) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-gray-300 mb-8">Portfolio</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {portfolioLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-[#d4af37] transition-colors inline-block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-gray-300 mb-8">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-[#d4af37] transition-colors inline-block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-gray-300 mb-8">Contact</h4>
                        <ul className="space-y-6 text-sm text-gray-500">
                            <li className="flex items-start gap-3 group cursor-pointer">
                                <MdLocationOn className="text-[#d4af37] text-lg flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-gray-300 transition-colors">
                                    Fifth Avenue, Suite 1200<br />New York, NY 10001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 group cursor-pointer">
                                <MdCall className="text-[#d4af37] text-lg flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="tel:+18005898726" className="group-hover:text-gray-300 transition-colors">+1 (800) LUX-URBN</a>
                            </li>
                            <li className="flex items-center gap-3 group cursor-pointer">
                                <MdMail className="text-[#d4af37] text-lg flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="mailto:concierge@urbannest.com" className="group-hover:text-gray-300 transition-colors">concierge@urbannest.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-[10px] uppercase tracking-wider">© 2024 UrbanNest Luxury Group.</p>
                    <div className="flex gap-8 text-[10px] uppercase tracking-wider text-gray-600">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
