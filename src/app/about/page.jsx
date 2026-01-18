'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdStar, MdPeople, MdHomeWork, MdTimeline } from 'react-icons/md';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const stats = [
    { label: 'Years of Excellence', value: '15+' },
    { label: 'Properties Sold', value: '$2B+' },
    { label: 'Satisfied Clients', value: '5k+' },
    { label: 'Global Cities', value: '30+' },
];

const values = [
    {
        title: 'Uncompromised Quality',
        description: 'We curate only the most exceptional properties, ensuring every listing meets our rigorous standards of luxury and architectural significance.',
        icon: MdStar
    },
    {
        title: 'Personalized Service',
        description: 'Every client journey is unique. We provide bespoke advisory services tailored to your specific investment goals and lifestyle aspirations.',
        icon: MdPeople
    },
    {
        title: 'Global Innovation',
        description: 'Leveraging cutting-edge technology and market intelligence to provide seamless transactions across international borders.',
        icon: MdTimeline
    }
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
                        alt="Luxury Interior"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-[#d4af37] font-bold text-sm tracking-[0.3em] uppercase mb-6"
                    >
                        Our Story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-light text-white leading-tight mb-8"
                    >
                        Defining the Art of <span className="font-serif italic font-medium">Modern Living</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        UrbanNest isn&apos;t just a real estate agency; we are the architects of a lifestyle. Connecting visionaries with spaces that inspire.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-[#1a1a1a] py-20 relative z-20 -mt-20 mx-6 md:mx-12 rounded-t-3xl shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="text-4xl md:text-5xl font-serif text-[#d4af37] mb-2">{stat.value}</h3>
                            <p className="text-gray-400 text-xs tracking-widest uppercase">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Narrative Section */}
            <section className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl text-[#1a1a1a] font-light mb-8 leading-tight">
                            We believe home is the <br />
                            <span className="font-serif italic border-b-2 border-[#d4af37]">ultimate expression</span> of self.
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                            <p>
                                Founded in 2024, UrbanNest emerged from a simple observation: the luxury real estate market lacked soul. It was transactional, cold, and disconnected from the emotional journey of finding a forever home.
                            </p>
                            <p>
                                We set out to change that. Combining data-driven precision with high-touch curation, we&apos;ve built a platform that honors the architectural integrity of every property and the unique aspirations of every client.
                            </p>
                            <p>
                                Today, we stand as the premier destination for distinctive properties, serving a global community of tastemakers, investors, and dreamers.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop"
                            alt="Architectural Detail"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-8 rounded-xl border border-gray-100 shadow-lg">
                            <p className="font-serif text-2xl italic text-[#1a1a1a]">&quot;Luxury must be comfortable, otherwise it is not luxury.&quot;</p>
                            <p className="text-xs font-bold tracking-widest uppercase mt-4 text-[#d4af37]">— Coco Chanel</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-gray-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-[#d4af37] font-bold text-xs tracking-[0.3em] uppercase">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mt-4">The UrbanNest Standard</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="size-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#d4af37] transition-colors">
                                    <item.icon className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 uppercase tracking-wide">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-light">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team/CTA Section */}
            <section className="py-32 px-6 md:px-12 bg-[#1b1b1b] text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-8">Ready to find your sanctuary?</h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        Explore our curated collection of exclusive properties or connect with an advisor to begin your tailored search.
                    </p>
                    <button className="bg-[#d4af37] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 shadow-lg shadow-[#d4af37]/20">
                        View Exclusive Listings
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
