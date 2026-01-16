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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <footer className="bg-charcoal text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="size-8 bg-primary flex items-center justify-center rounded text-white">
                                <MdDomain className="text-xl" />
                            </div>
                            <h2 className="text-xl font-extrabold tracking-tight uppercase">UrbanNest</h2>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            The world&apos;s premier destination for luxury architectural assets. Specializing in discrete high-value transactions.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, borderColor: '#d4af35' }}
                                    whileTap={{ scale: 0.9 }}
                                    className="size-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-lg" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Portfolio Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Portfolio</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {portfolioLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-white transition-colors inline-block hover:translate-x-1 transition-transform">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-white transition-colors inline-block hover:translate-x-1 transition-transform">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-primary">Contact</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li className="flex items-center gap-3">
                                <MdCall className="text-primary text-base flex-shrink-0" />
                                <span>+1 (800) LUX-URBN</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MdMail className="text-primary text-base flex-shrink-0" />
                                <span>concierge@urbannest.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MdLocationOn className="text-primary text-base flex-shrink-0 mt-0.5" />
                                <span>
                                    Fifth Avenue, Suite 1200<br />New York, NY 10001
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-600 text-xs">© 2024 UrbanNest Luxury Group. All Rights Reserved.</p>
                    <div className="flex gap-8 text-xs text-gray-600">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
