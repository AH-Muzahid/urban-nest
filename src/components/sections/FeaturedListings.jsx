'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MdBed, MdBathtub, MdSquareFoot } from 'react-icons/md';

const FeaturedListings = () => {
    const properties = [
        {
            id: 1,
            title: 'The Obsidian Villa',
            price: '$4,500,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfK2RDWAgLo0Tps6L6ujfdnQRDWXbJWHGylVusgJRXd4-suNtMqgdSHo8PRXBQp7h0eSxx6SRGZFulrWsg5Ot0VMquR9NFXtIxzjJc48VU2z6xLGiz7AnBJTJY4fKK6bdZ6ibdENnBk3DkjnxlLVNxJC_7jgKBuKoqozI4nLVpbN47tratA-SJTaZCL187ixlZFylt_C3Hdldga6kAGGClZuzoOFDpdTtr0rN8wmr_riq8K7Er_LhAsZlnjc6I2zBVXnRng28O9bvh',
            beds: 4,
            baths: 5,
            sqft: '4,200',
            featured: true,
        },
        {
            id: 2,
            title: 'Azure Penthouse',
            price: '$2,800,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOKH8yGMSBPKP4zUXqw3RmT4oOmg9L5Waf-lD8umjuziyL0ExbTtsH4hUglqwIdQPqTzCzvq2Cqzlv_QwVwTjktP4SnkUsWWLtlXZPf40tMha9mjrEju6WHmu4AXnGdzcyqlMF17DpMpHRnvKOblvOpzwpg7_iu5PtL4-EZ7sknVeNMmeVIlF2imRD16hpe0mE1OoNnRvPJhL6dcEqS-3sB04OrCMzCAvlWPs4LZzY-odpHRHRiwxBfOWnWbi3KEXdaU_na4AVfFbF',
            beds: 3,
            baths: 3,
            sqft: '2,500',
            featured: false,
        },
        {
            id: 3,
            title: 'Golden Gates Estate',
            price: '$7,250,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBySKyNSW1pirSzE-cCwszOzKMMxdtDBh-Zu0YduCsGRX1fgArUwwtcQD5fv6GV6hPiqcLNMMAyYLNQYp4DFHo0LcrGkWg4B5T9m7d3NDxFiaYloDwchdg_ZKWBFrbBEuCfQGURH5AM5imrPXu8EO-i2vXLDWtD99KltkxiLrw_k2boO4UTzDXyWrc0lMHNS4KO6xy-F3TBfn13Sl8uS6T7Jgt0wtGVQtaF5giA1Qvcf8fpASJLfUtgGd5LbGfiypxPcrcE82UCTQfJ',
            beds: 6,
            baths: 7,
            sqft: '8,500',
            featured: false,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
                        Curated Portfolio
                    </span>
                    <h2 className="text-4xl font-extrabold tracking-tight">FEATURED LISTINGS</h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        href="/properties"
                        className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-charcoal dark:hover:text-white transition-colors inline-block"
                    >
                        VIEW ALL PROPERTIES
                    </Link>
                </motion.div>
            </div>

            {/* Property Cards Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
                {properties.map((property) => (
                    <motion.div
                        key={property.id}
                        variants={cardVariants}
                        whileHover={{ y: -12 }}
                        className="group bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 border border-gray-100 dark:border-gray-800"
                    >
                        {/* Property Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                                style={{ backgroundImage: `url('${property.image}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {property.featured && (
                                <div className="absolute top-4 left-4 bg-charcoal/90 text-[#d4af37] px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    ★ Featured
                                </div>
                            )}
                        </div>

                        {/* Property Details */}
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold tracking-tight text-charcoal dark:text-white group-hover:text-primary transition-colors">{property.title}</h3>
                                <p className="text-primary font-black text-lg">{property.price}</p>
                            </div>

                            {/* Property Stats */}
                            <div className="flex gap-4 mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <MdBed className="text-lg" /> {property.beds} Bed
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <MdBathtub className="text-lg" /> {property.baths} Bath
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    <MdSquareFoot className="text-lg" /> {property.sqft} sqft
                                </div>
                            </div>

                            {/* Details Button */}
                            <button className="w-full py-4 border-2 border-[#1f2937] dark:border-gray-600 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#1f2937] hover:text-white dark:hover:bg-white dark:hover:text-[#1f2937] transition-all duration-300">
                                View Residence
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default FeaturedListings;
