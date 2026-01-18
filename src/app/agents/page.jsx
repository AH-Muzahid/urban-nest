'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdEmail, MdPhone, MdArrowOutward, MdVerified } from 'react-icons/md';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const agents = [
    {
        id: 1,
        name: 'Alexander Sterling',
        title: 'Senior Portfolio Director',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
        specialty: 'Penthouse & Sky Villas',
        volume: '$450M+',
        location: 'New York / London'
    },
    {
        id: 2,
        name: 'Isabella Chen',
        title: 'Head of International Sales',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
        specialty: 'Historic Estates',
        volume: '$320M+',
        location: 'Paris / Hong Kong'
    },
    {
        id: 3,
        name: 'Marcus Thorne',
        title: 'Luxury Investment Advisor',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop',
        specialty: 'Commercial & Development',
        volume: '$890M+',
        location: 'Dubai / Singapore'
    },
    {
        id: 4,
        name: 'Elena Rostova',
        title: 'Private Client Manager',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop',
        specialty: 'Waterfront Properties',
        volume: '$210M+',
        location: 'Miami / Monaco'
    },
    {
        id: 5,
        name: 'James Calloway',
        title: 'Director of Architecture',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
        specialty: 'Modern Masterpieces',
        volume: '$180M+',
        location: 'Los Angeles / Tokyo'
    },
    {
        id: 6,
        name: 'Sophia Laurent',
        title: 'Estate Specialist',
        image: 'https://images.unsplash.com/photo-1598550874175-4d7112ee7f1e?q=80&w=2666&auto=format&fit=crop',
        specialty: 'Vineyard & Ranch',
        volume: '$150M+',
        location: 'Tuscany / Napa Valley'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AgentsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-light text-[#1a1a1a] mb-6"
                    >
                        The <span className="font-serif italic">Curators</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Meet the global advisors redefining the standards of luxury real estate representation.
                        Discretion, expertise, and an unwavering commitment to excellence.
                    </motion.p>
                </div>
            </section>

            {/* Agents Grid */}
            <section className="px-6 pb-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {agents.map((agent) => (
                        <motion.div
                            key={agent.id}
                            variants={itemVariants}
                            className="group relative h-[600px] w-full bg-gray-200 overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={agent.image}
                                alt={agent.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />

                            {/* Hover Overlay - Full Dark */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="space-y-1 mb-6">
                                    <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-2">{agent.location}</p>
                                    <h3 className="text-3xl font-serif text-white">{agent.name}</h3>
                                    <p className="text-gray-300 font-light">{agent.title}</p>
                                </div>

                                {/* Expanded Details on Hover */}
                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 pb-4">
                                    <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6 mb-6">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Lifetime Volume</p>
                                            <p className="text-xl text-white font-serif">{agent.volume}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Specialty</p>
                                            <p className="text-sm text-white">{agent.specialty}</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-colors flex items-center justify-center gap-2">
                                        Contact Agent <MdArrowOutward />
                                    </button>
                                </div>
                            </div>

                            {/* Verified Badge */}
                            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
                                <MdVerified className="text-[#d4af37] text-xl" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Join CTA */}
            <section className="py-24 bg-[#1a1a1a] text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Are you a top producer?</h2>
                    <p className="text-gray-400 mb-10 text-lg">Join the world&apos;s most exclusive real estate network. We are always looking for exceptional talent.</p>
                    <button className="border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all uppercase text-sm font-bold tracking-widest">
                        Careers at UrbanNest
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
