'use client';

import { useComparison } from '@/context/ComparisonContext';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MdClose, MdCheck, MdRemoveCircleOutline, MdArrowForward, MdCompareArrows } from 'react-icons/md';

const ComparePage = () => {
    const { compareList, removeFromCompare, clearCompare } = useComparison();

    if (compareList.length === 0) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
                <Navbar />
                <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-charcoal p-12 rounded-3xl shadow-xl max-w-lg w-full border border-gray-100 dark:border-gray-800"
                    >
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MdCompareArrows className="text-3xl text-gray-400" />
                        </div>
                        <h1 className="text-xl font-black text-charcoal dark:text-white mb-3">No Properties to Compare</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                            Select up to 3 properties to compare their features side by side. Browse our listings and click the compare icon.
                        </p>
                        <Link href="/properties" className="bg-primary hover:bg-[#b5952d] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 transition-all inline-block">
                            Browse Properties
                        </Link>
                    </motion.div>
                </main>
                <Footer />
            </div>
        );
    }

    const compareAttributes = [
        { label: 'Price', key: 'price', format: (val) => `$${val?.toLocaleString()}` },
        { label: 'Location', key: 'location' },
        { label: 'Type', key: 'type' },
        { label: 'Bedrooms', key: 'bedrooms' },
        { label: 'Bathrooms', key: 'bathrooms' },
        { label: 'Area', key: 'area', format: (val) => `${val} sqft` },
        { label: 'Status', key: 'status' },
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-charcoal dark:text-gray-100">
            <Navbar />

            <main className="pt-36 pb-20 px-6 max-w-8xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-gray-200 dark:border-gray-800 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black mb-3 text-charcoal dark:text-white">Compare Properties</h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl text-sm leading-relaxed">
                            Analyze features, prices, and locations side-by-side to find the perfect match for your lifestyle.
                        </p>
                    </div>
                    <button
                        onClick={clearCompare}
                        className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 px-5 py-2 rounded-full transition-colors text-sm"
                    >
                        <MdRemoveCircleOutline className="text-lg" /> Clear Comparison
                    </button>
                </div>

                <div className="overflow-x-auto pb-8 scrollbar-hide">
                    <div className="min-w-[700px]">
                        <div className="grid grid-cols-[160px_repeat(3,1fr)] gap-4">
                            {/* Header Column (Empty top-left) */}
                            <div className="flex flex-col justify-end pb-8">
                                <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Property Details</span>
                            </div>

                            {/* Property Columns */}
                            {compareList.map((property) => (
                                <div key={property._id} className="relative group/card">
                                    <button
                                        onClick={() => removeFromCompare(property._id)}
                                        className="absolute -top-2 -right-2 z-10 bg-white dark:bg-charcoal text-red-500 border border-red-100 dark:border-red-900/30 rounded-full p-1.5 shadow-md hover:scale-110 transition-transform opacity-0 group-hover/card:opacity-100"
                                    >
                                        <MdClose className="text-sm" />
                                    </button>

                                    <div className="aspect-video rounded-xl overflow-hidden mb-4 relative group">
                                        <div
                                            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                            style={{ backgroundImage: `url('${property.images?.[0] || '/placeholder.jpg'}')` }}
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                    </div>

                                    <h3 className="text-base font-bold mb-1 truncate text-charcoal dark:text-white" title={property.title}>{property.title}</h3>
                                    <Link
                                        href={`/properties/${property._id}`}
                                        className="text-primary font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all mb-6 uppercase tracking-wider"
                                    >
                                        View Details <MdArrowForward />
                                    </Link>
                                </div>
                            ))}

                            {/* Empty Placeholders to maintain grid if < 3 items */}
                            {[...Array(3 - compareList.length)].map((_, i) => (
                                <div key={`placeholder-${i}`} className="bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-6">
                                    <div className="text-gray-300 dark:text-gray-700 font-bold text-sm mb-3">Empty Slot</div>
                                    <Link href="/properties" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
                                        Add Property
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Attribute Rows */}
                        <div className="space-y-1 mt-6">
                            {compareAttributes.map((attr) => (
                                <div key={attr.key} className="grid grid-cols-[160px_repeat(3,1fr)] gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md dark:hover:bg-gray-800/10 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-800/50">
                                    <div className="font-bold text-gray-500 uppercase text-[10px] tracking-widest flex items-center">
                                        {attr.label}
                                    </div>
                                    {compareList.map((property) => (
                                        <div key={`${property._id}-${attr.key}`} className="font-bold text-sm text-charcoal dark:text-gray-100 flex items-center">
                                            {attr.format ? attr.format(property[attr.key]) : property[attr.key] || '-'}
                                        </div>
                                    ))}
                                    {[...Array(3 - compareList.length)].map((_, i) => (
                                        <div key={`attr-placeholder-${i}`} className="text-gray-300 dark:text-gray-800">-</div>
                                    ))}
                                </div>
                            ))}

                            {/* Features Row - handles array */}
                            <div className="grid grid-cols-[160px_repeat(3,1fr)] gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md dark:hover:bg-gray-800/10 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-800/50">
                                <div className="font-bold text-gray-500 uppercase text-[10px] tracking-widest pt-1">
                                    Key Features
                                </div>
                                {compareList.map((property) => (
                                    <div key={`${property._id}-features`} className="space-y-1.5">
                                        {property.features?.slice(0, 5).map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                                                <MdCheck className="text-primary shrink-0 text-sm" /> {feature}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                {[...Array(3 - compareList.length)].map((_, i) => (
                                    <div key={`feat-placeholder-${i}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ComparePage;
