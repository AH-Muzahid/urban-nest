'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdFavorite, MdBed, MdBathtub, MdSquareFoot, MdArrowForward, MdCompareArrows, MdLocationOn } from 'react-icons/md';
import { useComparison } from '@/context/ComparisonContext';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
    const { compareList, addToCompare, removeFromCompare } = useComparison();
    const isCompared = compareList.some((item) => item._id === property._id);

    const toggleCompare = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCompared) {
            removeFromCompare(property._id);
        } else {
            addToCompare(property);
        }
    };

    // Format location
    const parts = property.location?.split(',') || [];
    const formattedLocation = parts.length > 2
        ? parts.slice(-3, -1).join(',').trim()
        : property.location;

    // Status visual
    const statusLabel = property.listingType === 'sale' ? 'For Sale' : 'For Rent';
    // Use gold for rent, charcoal for sale for contrast
    const statusColor = property.listingType === 'sale' ? 'bg-gray-900 text-white' : 'bg-[#d4af37] text-white';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 flex ${viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}
        >
            <div className={`relative overflow-hidden ${viewMode === 'list' ? 'h-48 md:h-auto md:w-2/5' : 'h-52'}`}>
                <Link href={`/properties/${property._id}`} className="block w-full h-full">
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700"
                        style={{ backgroundImage: `url('${property.images?.[0] || '/placeholder.jpg'}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </Link>

                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className={`${statusColor} backdrop-blur-md bg-opacity-95 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm`}>
                        {statusLabel}
                    </span>
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                        className="size-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm transition-colors"
                        onClick={(e) => e.preventDefault()}
                    >
                        <MdFavorite className="text-lg" />
                    </button>
                    <button
                        className={`size-9 rounded-full flex items-center justify-center shadow-sm transition-colors backdrop-blur-sm ${isCompared ? 'bg-[#d4af37] text-white' : 'bg-white/90 text-gray-500 hover:text-[#d4af37]'}`}
                        onClick={toggleCompare}
                    >
                        <MdCompareArrows className="text-lg" />
                    </button>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 relative">
                {/* Header: Price & Title */}
                <div className="flex justify-between items-start mb-2 gap-2">
                    <Link href={`/properties/${property._id}`} className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#d4af37] transition-colors truncate" title={property.title}>
                            {property.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                            <MdLocationOn className="text-[#d4af37]" />
                            <span className="truncate">{formattedLocation}</span>
                        </div>
                    </Link>
                    <div className="text-right shrink-0">
                        <span className="text-[#d4af37] text-lg font-black block">
                            ${property.price?.toLocaleString()}
                        </span>
                        {property.listingType === 'rent' && <span className="text-gray-400 text-[10px] font-bold uppercase block">/mo</span>}
                    </div>
                </div>

                {viewMode === 'list' && (
                    <p className="text-gray-500 text-xs mb-3 line-clamp-2 md:block hidden">
                        {property.description || "Experience luxury living in this stunning property."}
                    </p>
                )}

                {/* Amenities - Clean Horizontal Row */}
                <div className="border-t border-gray-100 mt-auto pt-3 flex items-center justify-between text-gray-600 text-xs font-bold">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg group-hover:bg-[#d4af37]/10 group-hover:text-[#d4af37] transition-colors">
                        <MdBed className="text-base" />
                        <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg group-hover:bg-[#d4af37]/10 group-hover:text-[#d4af37] transition-colors">
                        <MdBathtub className="text-base" />
                        <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg group-hover:bg-[#d4af37]/10 group-hover:text-[#d4af37] transition-colors">
                        <MdSquareFoot className="text-base" />
                        <span>{property.area} sqft</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
