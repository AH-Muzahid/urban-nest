'use client';

import { MdAdd, MdNotifications, MdMoreVert, MdArrowForward, MdHome, MdVisibility, MdGroup, MdAssignment, MdPendingActions } from 'react-icons/md';
import Link from 'next/link';

const DashboardHome = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a]">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-gray-50/80 dark:bg-[#1a1a1a]/90 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm md:shadow-none border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#1f2937] dark:text-white tracking-tight">Welcome back, Alexander</h1>
                    <p className="text-gray-500 text-xs mt-0.5">Today is Monday, October 23, 2023</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="size-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-[#d4af37] shadow-sm transition-colors border border-gray-200 dark:border-gray-700">
                        <MdNotifications className="text-base" />
                    </button>
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
                            <span className="bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-bold px-2 py-1 rounded-full">+2 this week</span>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Active Listings</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">12</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                            <div className="size-10 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37]">
                                <MdVisibility className="text-xl" />
                            </div>
                            <span className="bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-bold px-2 py-1 rounded-full">+14%</span>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Views (Mo)</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">8,432</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                            <div className="size-10 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37]">
                                <MdGroup className="text-xl" />
                            </div>
                            <span className="bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-bold px-2 py-1 rounded-full">+24</span>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Leads Generated</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">156</h3>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                            <div className="size-10 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37]">
                                <MdPendingActions className="text-xl" />
                            </div>
                            <span className="bg-[#fff8e1] text-[#d4af37] text-[10px] font-bold px-2 py-1 rounded-full">3 Closing Soon</span>
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pending Sales</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white">7</h3>
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
                            <div className="flex gap-4">
                                <div className="size-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                    <MdGroup />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#1f2937] dark:text-white">New lead for Penthouse</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">Contact: Julian Vane • 2 mins ago</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                    <MdAssignment />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#1f2937] dark:text-white">Listing updated</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">Price reduction: The Glass Estate • 4 hours ago</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                    <MdPendingActions />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#1f2937] dark:text-white">Showing scheduled</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">Skyline Duplex • Tomorrow at 2:00 PM</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                    <MdAssignment />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#1f2937] dark:text-white">New review received</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">5 stars from Sarah Jenkins • Yesterday</p>
                                </div>
                            </div>
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
                        <button className="px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold hover:bg-white dark:hover:bg-gray-800 transition-colors">
                            Manage All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {[
                            { title: 'The Penthouse at Azure', price: '$5,450,000', views: '1,204', leads: '4', color: 'bg-[#569886]' },
                            { title: 'The Glass Estate', price: '$12,800,000', views: '2,840', leads: '12', color: 'bg-[#6abca6]' },
                            { title: 'Skyline Duplex', price: '$3,200,000', views: '956', leads: '2', color: 'bg-[#67847c]' },
                            { title: 'Villa Mediterraneo', price: '$7,900,000', views: '3,105', leads: '18', color: 'bg-[#4a8274]' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
                                <div className={`h-40 ${item.color} relative p-4`}>
                                    <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full">ACTIVE</span>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        <MdHome className="text-6xl text-white" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-[#1f2937] dark:text-white mb-1 truncate">{item.title}</h4>
                                    <h3 className="text-[#d4af37] font-black text-xl mb-4">{item.price}</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                                        <span className="flex items-center gap-1"><MdVisibility /> {item.views} Views</span>
                                        <span className="flex items-center gap-1"><MdAssignment /> {item.leads} Leads</span>
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
