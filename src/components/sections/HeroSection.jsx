'use client';

// Imports
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MdLocationOn, MdPayments, MdHomeWork, MdSearch, MdKeyboardArrowDown } from 'react-icons/md';

const HeroSection = () => {
    const router = useRouter();
    const [searchFilters, setSearchFilters] = useState({
        location: '',
        price: '',
        type: ''
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchFilters.location) params.append('location', searchFilters.location);

        // Use maxPrice for budget filter
        const cleanPrice = searchFilters.price.replace(/[^0-9]/g, '');
        if (cleanPrice) params.append('maxPrice', cleanPrice);

        if (searchFilters.type && searchFilters.type !== 'All Types') params.append('type', searchFilters.type.toLowerCase());

        router.push(`/properties?${params.toString()}`);
    };

    return (
        <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-6 max-w-7xl mx-auto flex flex-col items-center pt-20">

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-5xl md:text-7xl font-bold tracking-tight text-center mb-6 leading-tight drop-shadow-2xl"
                >
                    Discover Your <br />
                    <span className="text-white">Dream Home</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-lg md:text-2xl font-medium text-center mb-12 max-w-2xl drop-shadow-lg"
                >
                    Explore the finest properties in the most desirable locations.
                </motion.p>

                {/* Clean White Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-white p-4 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center gap-4 w-full max-w-5xl mx-auto relative z-50"
                >
                    {/* Inputs */}
                    <div className="flex-1 w-full px-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0">
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Location</label>
                        <div className="flex items-center gap-2">
                            <MdLocationOn className="text-[#d4af37] text-xl" />
                            <input
                                className="w-full font-bold text-gray-800 placeholder:text-gray-300 outline-none text-lg"
                                placeholder="City or Zip"
                                value={searchFilters.location}
                                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex-1 w-full px-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0">
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Budget</label>
                        <div className="flex items-center gap-2">
                            <MdPayments className="text-[#d4af37] text-xl" />
                            <input
                                className="w-full font-bold text-gray-800 placeholder:text-gray-300 outline-none text-lg"
                                placeholder="Max Price"
                                value={searchFilters.price}
                                onChange={(e) => setSearchFilters({ ...searchFilters, price: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex-1 w-full px-4 pb-4 lg:pb-0 relative" ref={dropdownRef}>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Type</label>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <MdHomeWork className="text-[#d4af37] text-xl shrink-0" />
                            <div className="w-full font-bold text-gray-800 text-lg flex items-center justify-between select-none">
                                <span className="truncate">{searchFilters.type || 'All Types'}</span>
                                <MdKeyboardArrowDown className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        {/* Custom Dropdown Menu */}
                        <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[100] overflow-y-auto max-h-60 transition-all duration-200 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                            <div
                                className={`px-6 py-3 hover:bg-gray-50 cursor-pointer font-bold text-sm transition-colors ${searchFilters.type === '' ? 'text-[#d4af37] bg-gray-50' : 'text-gray-600 hover:text-[#d4af37]'}`}
                                onClick={() => {
                                    setSearchFilters({ ...searchFilters, type: '' });
                                    setIsDropdownOpen(false);
                                }}
                            >
                                All Types
                            </div>
                            {['Penthouse', 'Villa', 'Estate', 'Apartment', 'Condo'].map((type) => (
                                <div
                                    key={type}
                                    className={`px-6 py-3 hover:bg-gray-50 cursor-pointer font-bold text-sm transition-colors ${searchFilters.type === type ? 'text-[#d4af37] bg-gray-50' : 'text-gray-600 hover:text-[#d4af37]'}`}
                                    onClick={() => {
                                        setSearchFilters({ ...searchFilters, type: type });
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleSearch}
                        className="bg-[#d4af37] hover:bg-[#b08d2b] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg w-full lg:w-auto min-w-[140px] flex justify-center items-center gap-2"
                    >
                        <MdSearch className="text-xl" />
                        Search
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
