'use client';

import { useState } from 'react';
import { MdSearch, MdApartment, MdVilla, MdHome, MdHolidayVillage } from 'react-icons/md';

const SidebarFilters = ({ className = "" }) => {
    const propertyTypes = [
        { name: 'Penthouse', icon: MdApartment },
        { name: 'Villa', icon: MdVilla },
        { name: 'Mansion', icon: MdHome },
        { name: 'Estate', icon: MdHolidayVillage },
    ];

    const amenities = [
        'Infinity Pool', 'Smart Home', 'Gym', 'Private Cinema', 'Wine Cellar', 'Helipad'
    ];

    return (
        <aside className={`w-full lg:w-80 shrink-0 space-y-8 h-full overflow-y-auto no-scrollbar pb-10 ${className}`}>
            <div>
                <h1 className="text-2xl font-bold mb-1">Listings</h1>
                <p className="text-gray-500 text-sm">Showing 150 luxury estates</p>
            </div>

            {/* Location Search - NEW */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Location</h3>
                <div className="relative">
                    <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
                    <input
                        type="text"
                        placeholder="City, Neighborhood, or Zip"
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-primary rounded-xl py-3 pl-12 pr-4 text-sm font-semibold outline-none transition-all placeholder:font-normal"
                    />
                </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Price Range</h3>
                    <button className="text-xs text-primary font-bold hover:underline">RESET</button>
                </div>
                <div className="pt-6 px-2">
                    <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 relative rounded-full">
                        <div className="absolute h-1 bg-primary left-[20%] right-[30%] rounded-full"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 left-[20%] size-5 bg-white border-2 border-primary rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform"></div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-[30%] size-5 bg-white border-2 border-primary rounded-full cursor-pointer shadow-md hover:scale-110 transition-transform"></div>
                    </div>
                    <div className="flex justify-between mt-6 text-sm font-bold">
                        <span className="bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded border border-gray-100 dark:border-gray-700">$1.2M</span>
                        <span className="bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded border border-gray-100 dark:border-gray-700">$8.5M</span>
                    </div>
                </div>
            </div>

            {/* Property Type */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Property Type</h3>
                <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                        <button
                            key={type.name}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${type.name === 'Penthouse'
                                ? 'bg-[#d4af35]/10 border-[#d4af35] text-[#d4af35]'
                                : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-primary/50 text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            <type.icon className="text-lg" />
                            {type.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                        <button
                            key={amenity}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${amenity === 'Private Cinema'
                                ? 'bg-[#d4af35] text-white shadow-lg shadow-[#d4af35]/30'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {amenity}
                        </button>
                    ))}
                </div>
            </div>

            {/* Square Footage */}
            <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Square Footage</h3>
                <div className="flex items-center gap-3">
                    <input
                        className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-[#d4af35]/50 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Min"
                        type="number"
                    />
                    <input
                        className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-[#d4af35]/50 outline-none transition-all placeholder:text-gray-400"
                        placeholder="Max"
                        type="number"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button className="w-full py-4 rounded-full border-2 border-gray-200 dark:border-gray-800 font-bold text-sm hover:border-black dark:hover:border-white transition-all text-gray-500 hover:text-charcoal dark:hover:text-white">
                    Clear All Filters
                </button>
            </div>
        </aside>
    );
};

export default SidebarFilters;
