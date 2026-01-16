'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdFavorite, MdBed, MdBathtub, MdSquareFoot, MdArrowForward, MdCompareArrows } from 'react-icons/md';
import { useComparison } from '@/context/ComparisonContext';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
    const { compareList, addToCompare, removeFromCompare } = useComparison();
    const isCompared = compareList.some((item) => item.id === property.id);

    const toggleCompare = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCompared) {
            removeFromCompare(property.id);
        } else {
            addToCompare(property);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`group rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex ${viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}
        >
            <Link
                href={`/properties/${property.id}`}
                className={`block relative overflow-hidden ${viewMode === 'list' ? 'h-64 md:h-auto md:w-2/5 lg:w-1/3' : 'h-72'}`}
            >
                <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${property.image}')` }}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {property.featured && (
                        <span className="bg-white text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                            Featured
                        </span>
                    )}
                    {property.new && (
                        <span className="bg-primary text-background-dark text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                            New
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button
                        className="size-10 bg-black/20 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-red-500 transition-all shadow-sm"
                        onClick={(e) => e.preventDefault()}
                        title="Add to Favorites"
                    >
                        <MdFavorite className="text-xl" />
                    </button>
                    <button
                        className={`size-10 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm ${isCompared ? 'bg-primary text-white' : 'bg-black/20 hover:bg-white text-white hover:text-primary'}`}
                        onClick={toggleCompare}
                        title={isCompared ? "Remove from Compare" : "Add to Compare"}
                    >
                        <MdCompareArrows className="text-xl" />
                    </button>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20">
                        {property.location}
                    </span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="text-2xl font-black text-charcoal dark:text-white mb-1">{property.price}</h3>
                    <p className="text-gray-500 text-sm font-medium">{property.title}</p>
                </div>

                {viewMode === 'list' && (
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 hidden md:block">
                        Experience luxury living in this stunning property featuring state-of-the-art amenities and breathtaking views. Perfect for those who seek elegance and comfort.
                    </p>
                )}

                <div className="flex items-center gap-6 text-gray-500 text-xs font-bold mb-6">
                    <span className="flex items-center gap-2">
                        <MdBed className="text-lg" />
                        <span>{property.beds} <span className="font-normal text-gray-400">Beds</span></span>
                    </span>
                    <span className="flex items-center gap-2">
                        <MdBathtub className="text-lg" />
                        <span>{property.baths} <span className="font-normal text-gray-400">Baths</span></span>
                    </span>
                    <span className="flex items-center gap-2">
                        <MdSquareFoot className="text-lg" />
                        <span>{property.sqft} <span className="font-normal text-gray-400">sqft</span></span>
                    </span>
                </div>

                <div className={`mt-auto ${viewMode === 'list' ? 'md:self-start' : ''}`}>
                    <Link href={`/properties/${property.id}`} className="w-full md:w-auto px-8 bg-primary hover:bg-yellow-500 text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all">
                        View Details <MdArrowForward className="text-lg" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
