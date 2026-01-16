'use client';

import { MdAdd, MdSearch, MdEdit, MdVisibility, MdDelete, MdFilterList, MdKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';

const MyListingsPage = () => {
    const listings = [
        {
            id: 1,
            title: 'The Penthouse at Azure',
            address: '1200 Coastal Dr, Miami Beach, FL',
            status: 'Active',
            price: '$5,450,000',
            views: '1,204',
            leads: '4',
            dom: '14',
            color: 'bg-[#569886]'
        },
        {
            id: 2,
            title: 'The Glass Estate',
            address: '88 Bel Air Rd, Los Angeles, CA',
            status: 'Active',
            price: '$12,800,000',
            views: '2,840',
            leads: '12',
            dom: '42',
            color: 'bg-[#6abca6]'
        },
        {
            id: 3,
            title: 'Skyline Duplex',
            address: '450 Park Avenue, New York, NY',
            status: 'Pending',
            price: '$3,200,000',
            views: '956',
            leads: '2',
            dom: '18',
            color: 'bg-[#67847c]'
        },
        {
            id: 4,
            title: 'Villa Mediterraneo',
            address: '15 Capri Blvd, Naples, FL',
            status: 'Sold',
            price: '$7,900,000',
            views: '3,105',
            leads: '18',
            dom: '85',
            color: 'bg-[#4a8274]'
        },
        { id: 5, title: 'Seaside Manor', address: '22 Ocean Dr, Malibu, CA', status: 'Active', price: '$9,200,000', views: '1,500', leads: '8', dom: '22', color: 'bg-[#569886]' },
        { id: 6, title: 'Urban Loft', address: '88 Broadway, New York, NY', status: 'Pending', price: '$2,100,000', views: '800', leads: '5', dom: '10', color: 'bg-[#6abca6]' },
        { id: 7, title: 'Mountain Retreat', address: '100 Alpine Way, Aspen, CO', status: 'Active', price: '$15,000,000', views: '4,200', leads: '25', dom: '60', color: 'bg-[#67847c]' },
        { id: 8, title: 'Lakefront Cottage', address: '45 Lakeview, Tahoe, NV', status: 'Sold', price: '$4,500,000', views: '2,100', leads: '10', dom: '30', color: 'bg-[#4a8274]' },
        { id: 9, title: 'Desert Oasis', address: '77 Palms, Palm Springs, CA', status: 'Active', price: '$3,800,000', views: '1,200', leads: '6', dom: '15', color: 'bg-[#569886]' },
        { id: 10, title: 'Historic Townhouse', address: '12 State St, Boston, MA', status: 'Pending', price: '$6,700,000', views: '3,500', leads: '14', dom: '45', color: 'bg-[#6abca6]' }
    ];

    const getStatusColor = (status) => {
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
                            placeholder="Search by"
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2 pl-11 pr-6 text-xs font-bold outline-none focus:border-[#d4af37] w-full md:w-64 shadow-sm"
                        />
                    </div>

                    {/* Filter */}
                    <div className="relative">
                        <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full py-2 pl-6 pr-10 text-xs font-bold text-gray-600 outline-none appearance-none cursor-pointer shadow-sm hover:border-gray-300">
                            <option>Status: All</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Sold</option>
                        </select>
                        <MdKeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
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
                        {listings.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">

                                {/* Property Details */}
                                <div className="col-span-12 md:col-span-3 flex items-center gap-4">
                                    <div className={`size-14 rounded-xl ${item.color} flex-shrink-0 relative overflow-hidden`}>
                                        {/* Mock Image Content */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 text-white p-2 text-center">
                                            <div className="w-6 h-px bg-white/50 mb-1"></div>
                                            <div className="text-[8px] uppercase tracking-widest">Property</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1f2937] dark:text-white text-sm mb-0.5">{item.title}</h3>
                                        <p className="text-gray-400 text-xs flex items-center gap-1">
                                            <span className="inline-block size-0.5 rounded-full bg-gray-300"></span>
                                            {item.address}
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
                                    <span className="font-black text-[#d4af37] text-base block md:inline">{item.price}</span>
                                </div>

                                {/* Performance */}
                                <div className="col-span-12 md:col-span-3 flex items-center justify-center gap-8 mt-3 md:mt-0">
                                    <div className="text-center">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-0">Views</div>
                                        <div className="font-bold text-sm">{item.views}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-0">Leads</div>
                                        <div className="font-bold text-sm">{item.leads}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-0">DOM</div>
                                        <div className="font-bold text-sm">{item.dom}</div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2 mt-3 md:mt-0">
                                    <button className="size-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:text-white transition-colors">
                                        <MdEdit className="text-sm" />
                                    </button>
                                    <button className="size-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-[#d4af37] hover:text-white transition-colors">
                                        <MdVisibility className="text-sm" />
                                    </button>
                                    <button className="size-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-colors">
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
                </div>
            </div>
        </div>
    );
};

export default MyListingsPage;
