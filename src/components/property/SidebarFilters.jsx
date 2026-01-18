'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { MdSearch, MdApartment, MdVilla, MdHome, MdHolidayVillage, MdSell, MdKey } from 'react-icons/md';

const SidebarFilters = ({ className = "" }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State for local inputs before applying (debounce could be added for text)
    const [location, setLocation] = useState(searchParams.get('location') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    // Sync local state with URL params on mount/change
    useEffect(() => {
        // eslint-disable-next-line
        setLocation(searchParams.get('location') || '');
        // eslint-disable-next-line
        setMinPrice(searchParams.get('minPrice') || '');
        // eslint-disable-next-line
        setMaxPrice(searchParams.get('maxPrice') || '');
    }, [searchParams]);

    const createQueryString = (name, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        params.delete('page');
        return params.toString();
    };

    const updateFilter = (name, value) => {
        const queryString = createQueryString(name, value);
        router.push(`${pathname}?${queryString}`);
    };

    const propertyTypes = [
        { name: 'House', value: 'house', icon: MdHome },
        { name: 'Apartment', value: 'apartment', icon: MdApartment },
        { name: 'Condo', value: 'condo', icon: MdApartment },
        { name: 'Villa', value: 'villa', icon: MdVilla },
        { name: 'Penthouse', value: 'penthouse', icon: MdApartment },
        { name: 'Mansion', value: 'mansion', icon: MdVilla },
        { name: 'Estate', value: 'estate', icon: MdHolidayVillage },
    ];

    const listingStatuses = [
        { name: 'Buy', value: 'sale', icon: MdSell },
        { name: 'Rent', value: 'rent', icon: MdKey },
    ];

    const currentType = searchParams.get('type');
    const currentStatus = searchParams.get('status');

    // Simple debounce for text input
    const handleLocationChange = (e) => {
        const val = e.target.value;
        setLocation(val);
        // In a real app, debounce this. For now, simple onBlur or Enter key is better, 
        // but we'll specific update on Enter or Blur
    };

    const applyLocation = () => updateFilter('location', location);

    const clearFilters = () => {
        router.push(pathname);
    };

    return (
        <aside className={`w-full h-full overflow-y-auto no-scrollbar pb-20 ${className}`}>

            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
                <h1 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Filters</h1>
                <button onClick={clearFilters} className="text-[10px] font-bold text-red-500 hover:text-red-600">
                    RESET
                </button>
            </div>

            <div className="space-y-5">
                {/* Location */}
                <div className="space-y-1.5">
                    <div className="relative group">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-400" />
                        <input
                            type="text"
                            value={location}
                            onChange={handleLocationChange}
                            onKeyDown={(e) => e.key === 'Enter' && applyLocation()}
                            onBlur={applyLocation}
                            placeholder="Location..."
                            className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent focus:bg-white focus:border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-xs font-semibold outline-none transition-all dark:text-white"
                        />
                    </div>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Price Range</label>
                    <div className="flex gap-2">
                        <input
                            className="w-full bg-gray-50 dark:bg-gray-800 border-transparent rounded-lg text-xs py-2.5 px-3 outline-none font-semibold dark:text-white"
                            placeholder="Min"
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            onBlur={(e) => updateFilter('minPrice', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && updateFilter('minPrice', minPrice)}
                        />
                        <input
                            className="w-full bg-gray-50 dark:bg-gray-800 border-transparent rounded-lg text-xs py-2.5 px-3 outline-none font-semibold dark:text-white"
                            placeholder="Max"
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            onBlur={(e) => updateFilter('maxPrice', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && updateFilter('maxPrice', maxPrice)}
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Status</label>
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        {listingStatuses.map((statusObj) => {
                            const isActive = currentStatus === statusObj.value;
                            return (
                                <button
                                    key={statusObj.name}
                                    onClick={() => updateFilter('status', isActive ? '' : statusObj.value)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-opacity ${isActive
                                        ? 'bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm'
                                        : 'text-gray-400 hover:opacity-70'
                                        }`}
                                >
                                    {statusObj.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Property Category */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Property Type</label>
                    <div className="grid grid-cols-2 gap-2">
                        {propertyTypes.map((typeObj) => {
                            const isActive = currentType === typeObj.value;
                            return (
                                <button
                                    key={typeObj.name}
                                    onClick={() => updateFilter('type', isActive ? '' : typeObj.value)}
                                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-opacity text-xs font-bold ${isActive
                                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                                        : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 hover:opacity-70'
                                        }`}
                                >
                                    <typeObj.icon className={isActive ? "text-white dark:text-black text-sm" : "text-gray-400 text-sm"} />
                                    <span>{typeObj.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        onClick={clearFilters}
                        className="w-full py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:opacity-80 text-gray-600 dark:text-gray-300 font-bold text-xs uppercase"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilters;
