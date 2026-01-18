'use client';

import { useState, useEffect } from 'react';
import { MdAdd, MdNotifications, MdMoreVert, MdArrowForward, MdHome, MdVisibility, MdGroup, MdAssignment, MdPendingActions, MdMail } from 'react-icons/md';
import Link from 'next/link';
import { getUserProperties } from '@/services/propertyService';
import { getReceivedInquiries } from '@/services/inquiryService';

const DashboardHome = () => {
    const [recentListings, setRecentListings] = useState([]);
    const [stats, setStats] = useState({ active: 0, views: 0, leads: 0, pending: 0 });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [properties, inquiries] = await Promise.all([
                    getUserProperties(),
                    getReceivedInquiries()
                ]);

                // Calculate Stats
                const active = properties.filter(p => p.status === 'available').length;
                const pending = properties.filter(p => p.status === 'pending').length;
                const views = properties.reduce((acc, curr) => acc + (curr.views || 0), 0);
                const leads = inquiries.length;

                setStats({ active, views, leads, pending });
                setRecentListings(properties.slice(0, 4));
                setRecentActivity(inquiries.slice(0, 4));

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a]">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-gray-50/80 dark:bg-[#1a1a1a]/90 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm md:shadow-none border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#1f2937] dark:text-white tracking-tight">Welcome back, Alexander</h1>
                    <p className="text-gray-500 text-xs mt-0.5">Today is Monday, October 23, 2023</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/messages" className="size-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-[#d4af37] shadow-sm transition-colors border border-gray-200 dark:border-gray-700">
                        <MdNotifications className="text-base" />
                    </Link>
                    <Link href="/dashboard/add-property" className="bg-[#1f2937] hover:bg-black text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-xl">
                        <MdAdd className="text-lg" /> Add New Property
                    </Link>
                </div>
            </header>

            <div className="p-6 pt-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                            <div className="size-10 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37]">
                                <MdAssignment className="text-xl" />
                            </div>
                            <span className="bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-bold px-2 py-1 rounded-full">{stats.active > 0 ? '+' : ''}{stats.active} total</span>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Active Listings</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">{loading ? '...' : stats.active}</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                            <div className="size-10 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37]">
                                <MdVisibility className="text-xl" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Views</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">{loading ? '...' : stats.views.toLocaleString()}</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                            <div className="size-10 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37]">
                                <MdGroup className="text-xl" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Leads Generated</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">{loading ? '...' : stats.leads}</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                            <div className="size-10 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37]">
                                <MdPendingActions className="text-xl" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pending Sales</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">{loading ? '...' : stats.pending}</h3>
                    </div>
                </div>

                {/* Charts & Activity Config */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Performance Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#1f2937] dark:text-white">Performance Overview</h3>
                                <p className="text-xs text-gray-400">Listing views over the last 30 days</p>
                            </div>
                            <select className="bg-gray-50 dark:bg-gray-900 border-none text-xs font-bold text-gray-500 rounded-lg px-3 py-2 outline-none cursor-pointer">
                                <option>Last 30 Days</option>
                                <option>Last 7 Days</option>
                            </select>
                        </div>

                        <div className="flex items-end justify-between h-64 gap-2 md:gap-4 px-2">
                            {[40, 65, 45, 80, 55, 70, 60, 95, 25, 60, 45, 55, 65, 75, 50, 60, 85, 40, 30].map((h, i) => (
                                <div key={i} className="w-full bg-gray-100 dark:bg-gray-700 rounded-t-lg relative group transition-all hover:bg-[#d4af37]/30" style={{ height: `${h}%` }}>
                                    {i === 7 && <div className="absolute inset-0 bg-[#d4af37] rounded-t-lg shadow-lg shadow-[#d4af37]/40"></div>}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-4 px-2">
                            <span>Sep 23</span>
                            <span>Oct 01</span>
                            <span>Oct 08</span>
                            <span>Oct 15</span>
                            <span>Today</span>
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-[#1f2937] dark:text-white">Recent Activity</h3>
                            <Link href="/dashboard/activity" className="text-[#d4af37] text-xs font-bold hover:underline">View All</Link>
                        </div>

                        <div className="space-y-6">
                            {loading && <p className="text-xs text-gray-400">Loading activity...</p>}
                            {!loading && recentActivity.length === 0 && <p className="text-xs text-gray-400">No recent activity.</p>}
                            {recentActivity.map((inquiry) => (
                                <div key={inquiry._id} className="flex gap-4">
                                    <div className="size-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                        <MdMail />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#1f2937] dark:text-white">New inquiry received</h4>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            From {inquiry.sender?.name || 'Guest'} for {inquiry.property?.title || 'Unknown Property'} • {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Listings */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-[#1f2937] dark:text-white">My Recent Listings</h3>
                            <p className="text-sm text-gray-500">Quick overview of your latest market entries</p>
                        </div>
                        <Link href="/dashboard/listings" className="px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold hover:bg-white dark:hover:bg-gray-800 transition-colors">
                            Manage All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {loading ? <p className="text-gray-500">Loading listings...</p> : recentListings.length === 0 ? <p className="text-gray-500">No active listings.</p> : recentListings.map((item, i) => (
                            <div key={item._id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
                                <div className={`h-40 bg-gray-200 relative`}>
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.images?.[0] || '/placeholder.jpg'})` }}
                                    />
                                    <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full">ACTIVE</span>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-[#1f2937] dark:text-white mb-1 truncate">{item.title}</h4>
                                    <h3 className="text-[#d4af37] font-black text-xl mb-4">${item.price?.toLocaleString()}</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                                        <span className="flex items-center gap-1"><MdVisibility /> {item.views || 0} Views</span>
                                        <span className="flex items-center gap-1"><MdAssignment /> {item.numReviews || 0} Reviews</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
