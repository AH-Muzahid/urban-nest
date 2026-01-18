'use client';

import { useState, useEffect, useRef } from 'react';
import { MdAdd, MdSearch, MdEdit, MdVisibility, MdDelete, MdFilterList, MdKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { getUserProperties, deleteProperty } from '@/services/propertyService';
import { AnimatePresence, motion } from 'framer-motion';

const MyListingsPage = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const data = await getUserProperties();
            setListings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredListings = listings.filter(item => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = (item.title?.toLowerCase() || '').includes(query) ||
            (item.location?.toLowerCase() || '').includes(query);

        if (statusFilter === 'All') return matchesSearch;

        const dbStatus = statusFilter === 'Active' ? 'available' : statusFilter.toLowerCase();
        return matchesSearch && item.status === dbStatus;
    });

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this property?')) return;
        try {
            await deleteProperty(id);
            toast.success('Property deleted successfully');
            fetchListings();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete property');
        }
    };

    const getStatusColor = (status) => {
        if (!status) return 'bg-[#fff8e1] text-[#d4af37] border border-[#d4af37]/20';
        switch (status) {
            case 'Active': return 'bg-[#fff8e1] text-[#d4af37] border border-[#d4af37]/20';
            case 'Pending': return 'bg-[#1f2937] text-white';
            case 'Sold': return 'bg-gray-100 text-gray-400';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a]">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-gray-50/80 dark:bg-[#1a1a1a]/90 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm md:shadow-none border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#1f2937] dark:text-white tracking-tight">My Listings</h1>
                    <p className="text-gray-500 text-xs mt-0.5">Manage and monitor your property portfolio</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 md:flex-none">
                        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search by title or location"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2 pl-11 pr-6 text-xs font-bold outline-none focus:border-[#d4af37] w-full md:w-64 shadow-sm"
                        />
                    </div>

                    {/* Filter */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 outline-none shadow-sm hover:border-gray-300 min-w-[150px] justify-between transition-all"
                        >
                            <span className="truncate">{statusFilter === 'All' ? 'Status: All' : statusFilter}</span>
                            <MdKeyboardArrowDown className={`text-lg transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isStatusDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
                                >
                                    {['All', 'Active', 'Pending', 'Sold'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setIsStatusDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-5 py-3 text-xs font-bold transition-all border-b border-gray-50 dark:border-gray-700/50 last:border-none ${statusFilter === status
                                                ? 'bg-[#d4af37]/10 text-[#d4af37]'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200'
                                                }`}
                                        >
                                            {status === 'All' ? 'Status: All' : status}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Add Button */}
                    <Link href="/dashboard/add-property" className="bg-[#1f2937] hover:bg-black text-white px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-xl ml-auto md:ml-0">
                        <MdAdd className="text-lg" /> Add New
                    </Link>
                </div>
            </header>

            <div className="p-6 md:p-8 pt-4">
                {/* Listings Table Card */}
                <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {loading && <div className="p-12 text-center text-gray-400">Loading your listings...</div>}
                    {!loading && listings.length === 0 && <div className="p-12 text-center text-gray-400">You haven&apos;t listed any properties yet.</div>}
                    {!loading && listings.length > 0 && filteredListings.length === 0 && <div className="p-12 text-center text-gray-400">No properties found matching your criteria.</div>}

                    {!loading && filteredListings.length > 0 && (
                        <>
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50/50 dark:bg-gray-900/50">
                                <div className="col-span-12 md:col-span-3">Property Details</div>
                                <div className="hidden md:block md:col-span-2 text-center">Status</div>
                                <div className="hidden md:block md:col-span-2">Price</div>
                                <div className="hidden md:block md:col-span-3 text-center">Performance</div>
                                <div className="hidden md:block md:col-span-2 text-right">Actions</div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredListings.map((item) => (
                                    <div key={item._id} className="grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">

                                        {/* Property Details */}
                                        <div className="col-span-12 md:col-span-3 flex items-center gap-4">
                                            <div className={`size-14 rounded-xl bg-gray-200 flex-shrink-0 relative overflow-hidden`}>
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${item.images?.[0] || '/placeholder.jpg'})` }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#1f2937] dark:text-white text-sm mb-0.5">{item.title}</h3>
                                                <p className="text-gray-400 text-xs flex items-center gap-1">
                                                    <span className="inline-block size-0.5 rounded-full bg-gray-300"></span>
                                                    {(() => {
                                                        if (!item.location) return 'No Location';
                                                        const parts = item.location.split(',');
                                                        if (parts.length > 2) {
                                                            // Try to extract City, State from typical long addresses
                                                            // Often: Address, City, State, Country
                                                            // or: Address, City, State, Zip, Country
                                                            // We want City, State.
                                                            // Taking the 2nd and 3rd to last often works if there is no zip.
                                                            // If there is zip, it might be weird.
                                                            // Let's try 2 parts from the end excluding county?
                                                            // Let's just return the whole string but truncated via CSS if needed, 
                                                            // BUT the user asked explicitly for the format "nicher tar moto" (like the bottom one).
                                                            // The bottom one is "Los Angeles, CA".
                                                            // I will use parts.slice(-3, -1) as a best guess for "City, State" from a long mapbox/google string.
                                                            return parts.slice(-3, -1).join(', ').trim();
                                                        }
                                                        return item.location;
                                                    })()}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-6 md:col-span-2 flex md:justify-center mt-3 md:mt-0">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-6 md:col-span-2 mt-3 md:mt-0">
                                            <span className="font-black text-[#d4af37] text-base block md:inline">${item.price?.toLocaleString()}</span>
                                        </div>

                                        {/* Performance */}
                                        <div className="col-span-12 md:col-span-3 flex items-center justify-center gap-8 mt-3 md:mt-0">
                                            <div className="text-center">
                                                <div className="text-[10px] text-gray-400 font-bold uppercase mb-0">Views</div>
                                                <div className="font-bold text-sm">{item.views || 0}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[10px] text-gray-400 font-bold uppercase mb-0">Reviews</div>
                                                <div className="font-bold text-sm">{item.numReviews || 0}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[10px] text-gray-400 font-bold uppercase mb-0">Rating</div>
                                                <div className="font-bold text-sm">{item.averageRating || 0}</div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2 mt-3 md:mt-0">
                                            <Link href={`/dashboard/edit-property/${item._id}`} className="size-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:text-white transition-colors">
                                                <MdEdit className="text-sm" />
                                            </Link>
                                            <Link href={`/properties/${item._id}`} className="size-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:text-white transition-colors">
                                                <MdVisibility className="text-sm" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="size-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <MdDelete className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer / Pagination */}
                            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Showing 1-10 of 20 Listings</p>
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-bold hover:bg-white hover:shadow-sm transition-all bg-transparent">
                                        Previous
                                    </button>
                                    <button className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-bold hover:bg-white hover:shadow-sm transition-all bg-white dark:bg-gray-800 shadow-sm">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyListingsPage;
