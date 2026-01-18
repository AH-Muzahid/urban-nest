'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import SidebarFilters from '@/components/property/SidebarFilters';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyCardSkeleton from '@/components/property/PropertyCardSkeleton';
import MapViewToggle from '@/components/property/MapViewToggle';
import { MdGridView, MdViewList, MdClose, MdKeyboardArrowDown, MdFilterList, MdMap } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getProperties } from '@/services/propertyService';
import dynamic from 'next/dynamic';

const PropertyMap = dynamic(() => import('@/components/property/PropertyMap'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 flex items-center justify-center">Loading Map...</div>
});

const PropertiesContent = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortDropdownRef = useRef(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentSort = searchParams.get('sort') || 'newest';
    const sortOptions = [
        { label: 'Newest First', value: 'newest' },
        { label: 'Oldest First', value: 'oldest' },
        { label: 'Price: High to Low', value: 'price_desc' },
        { label: 'Price: Low to High', value: 'price_asc' },
    ];

    const handleSortChange = (value) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', value);
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
        setIsSortOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            if (properties.length === 0) {
                setLoading(true);
            } else {
                setIsFetching(true);
            }

            try {
                const params = Object.fromEntries(searchParams.entries());
                const data = await getProperties(params);
                if (data.properties) {
                    setProperties(data.properties);
                    setPagination({
                        currentPage: data.currentPage,
                        totalPages: data.totalPages
                    });
                } else {
                    setProperties(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                setIsFetching(false);
            }
        };

        fetchProperties();
    }, [properties.length, searchParams]);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage);
        router.push(`${pathname}?${params.toString()}`);
    };

    const activeFilters = [];
    searchParams.forEach((value, key) => {
        if (value && key !== 'page' && key !== 'limit') activeFilters.push({ key, value });
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-gray-100 font-display">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-6 pb-16 flex gap-8 relative">

                <div className="hidden lg:block w-64 shrink-0 sticky top-24 h-[calc(100vh-160px)]">
                    <SidebarFilters />
                </div>

                {/* Mobile Filters Overlay */}
                <AnimatePresence>
                    {mobileFiltersOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileFiltersOpen(false)}
                                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed inset-y-0 right-0 w-[300px] bg-white dark:bg-charcoal z-50 lg:hidden p-6 shadow-2xl overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold">Filters</h2>
                                    <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                                        <MdClose className="text-xl" />
                                    </button>
                                </div>
                                <SidebarFilters />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex-1 w-full">
                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 w-full">
                        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                            {activeFilters.map((filter) => (
                                <span key={filter.key} className="bg-[#d4af35]/10 text-[#d4af35] border border-[#d4af35]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    {filter.key}: {filter.value}
                                </span>
                            ))}
                            {activeFilters.length === 0 && (
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">All Properties</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between w-full md:w-auto gap-4">
                            {/* Mobile Filter Toggle Button */}
                            <button
                                onClick={() => setMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20"
                            >
                                <MdFilterList className="text-lg" /> Filters
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-charcoal text-[#d4af35] dark:bg-white dark:text-charcoal' : 'text-gray-400 hover:text-charcoal dark:hover:text-white'}`}
                                    >
                                        <MdGridView />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-charcoal text-[#d4af35] dark:bg-white dark:text-charcoal' : 'text-gray-400 hover:text-charcoal dark:hover:text-white'}`}
                                    >
                                        <MdViewList />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('map')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-charcoal text-[#d4af35] dark:bg-white dark:text-charcoal' : 'text-gray-400 hover:text-charcoal dark:hover:text-white'}`}
                                        title="Map View"
                                    >
                                        <MdMap />
                                    </button>
                                </div>

                                <div className="relative" ref={sortDropdownRef}>
                                    <button
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="flex items-center gap-2 text-sm font-bold bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2.5 rounded-xl cursor-pointer hover:border-primary transition-all min-w-[170px] justify-between"
                                    >
                                        {sortOptions.find(opt => opt.value === currentSort)?.label || 'Newest First'}
                                        <MdKeyboardArrowDown className={`text-lg transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isSortOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-30 overflow-hidden"
                                            >
                                                {sortOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => handleSortChange(option.value)}
                                                        className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${currentSort === option.value ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-charcoal dark:text-gray-200'}`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area: Grid/List/Map */}
                    {viewMode === 'map' ? (
                        <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 relative z-0">
                            <PropertyMap properties={properties} />
                        </div>
                    ) : (
                        <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                            {loading ? (
                                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-8"}>
                                    {[...Array(6)].map((_, index) => (
                                        <PropertyCardSkeleton key={index} viewMode={viewMode} />
                                    ))}
                                </div>
                            ) : properties.length === 0 ? (
                                <p className="col-span-3 text-center py-20 text-gray-500">No properties found.</p>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-8"}
                                >
                                    {properties.map((property) => (
                                        <PropertyCard key={property._id} property={property} viewMode={viewMode} />
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {viewMode !== 'map' && pagination.totalPages > 1 && (
                        <div className="mt-20 flex flex-col items-center gap-8">
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    className="px-4 py-2 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 font-bold disabled:opacity-50"
                                >
                                    Prev
                                </button>

                                {[...Array(pagination.totalPages)].map((_, index) => {
                                    const pageNum = index + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`size-10 rounded-full font-bold flex items-center justify-center ${pagination.currentPage === pageNum
                                                ? 'border-2 border-[#d4af35] text-[#d4af35]'
                                                : 'border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    className="px-4 py-2 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 font-bold disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <MapViewToggle onClick={() => setViewMode(viewMode === 'map' ? 'grid' : 'map')} isMapOpen={viewMode === 'map'} />
            <Footer />
        </div>
    );
};

const PropertiesPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-charcoal font-bold tracking-widest uppercase">Loading Properties...</div>}>
            <PropertiesContent />
        </Suspense>
    );
};

export default PropertiesPage;
