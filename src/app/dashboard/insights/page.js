'use client';

import { MdCalendarToday, MdFileDownload, MdVisibility, MdStar, MdAccessTime, MdArrowUpward, MdArrowDownward, MdMap, MdHome } from 'react-icons/md';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const InsightsPage = () => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a]"
        >
            {/* Header */}
            <motion.header
                variants={itemVariants}
                className="sticky top-0 z-20 bg-gray-50/80 dark:bg-[#1a1a1a]/90 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm md:shadow-none border-b border-gray-100 dark:border-gray-800"
            >
                <div>
                    <h1 className="text-2xl font-extrabold text-[#1f2937] dark:text-white tracking-tight">Performance Insights</h1>
                    <p className="text-gray-500 text-xs mt-0.5">Real-time data for your luxury portfolio</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md hover:border-[#d4af37]/30 transition-all">
                        Last 30 Days <MdCalendarToday className="text-gray-400" />
                    </button>
                    <button className="size-8 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-all">
                        <MdFileDownload className="text-base" />
                    </button>
                </div>
            </motion.header>

            <div className="p-6 md:p-8 pt-4">
                {/* Top Stats Cards */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Views Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-6 right-6 bg-green-50 text-green-600 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <MdArrowUpward /> +12.4%
                        </div>
                        <div className="size-12 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37] mb-4 group-hover:scale-110 transition-transform">
                            <MdVisibility className="text-2xl" />
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Listing Views</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white group-hover:text-[#d4af37] transition-colors">42,894</h3>
                    </div>

                    {/* Conversion Rate Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-6 right-6 bg-green-50 text-green-600 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <MdArrowUpward /> +3.1%
                        </div>
                        <div className="size-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-[#1f2937] dark:text-white mb-4 group-hover:scale-110 transition-transform">
                            <MdStar className="text-2xl" />
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Conversion Rate</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white group-hover:text-[#d4af37] transition-colors">4.28%</h3>
                    </div>

                    {/* Avg Time Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="absolute top-6 right-6 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-lg text-xs font-bold">
                            Avg
                        </div>
                        <div className="size-12 bg-[#fff8e1] rounded-full flex items-center justify-center text-[#d4af37] mb-4 group-hover:scale-110 transition-transform">
                            <MdAccessTime className="text-2xl" />
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Average Time to Sale</p>
                        <h3 className="text-3xl font-black text-[#1f2937] dark:text-white group-hover:text-[#d4af37] transition-colors">34 <span className="text-base font-normal text-gray-400">Days</span></h3>
                    </div>
                </motion.div>

                {/* Middle Section: Chart and Geography */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Traffic Sources Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-[#1f2937] dark:text-white">Traffic Sources</h3>
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#d4af37]"></span> Desktop</div>
                                <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#1f2937] dark:bg-gray-400"></span> Mobile</div>
                            </div>
                        </div>

                        {/* SVG Chart */}
                        <div className="w-full h-56 relative">
                            <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 50" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="goldGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Desktop Area (Gold) */}
                                <path
                                    d="M0,45 C20,40 30,30 50,20 S70,10 100,15 V50 H0 Z"
                                    fill="url(#goldGradient)"
                                    stroke="none"
                                />

                                {/* Desktop Line (Gold) */}
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    d="M0,45 C20,40 30,30 50,20 S70,10 100,15"
                                    fill="none"
                                    stroke="#d4af37"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                {/* Mobile Line (Dark) */}
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                                    d="M0,48 C20,45 40,35 60,40 S80,35 100,25"
                                    fill="none"
                                    stroke="#1f2937"
                                    className="dark:stroke-gray-400"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />

                                {/* Grid Lines */}
                                <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="#f3f4f6" strokeWidth="0.2" className="dark:stroke-gray-700" />
                                <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.2" className="dark:stroke-gray-700" />
                                <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="#f3f4f6" strokeWidth="0.2" className="dark:stroke-gray-700" />
                            </svg>

                            {/* X-Axis Labels */}
                            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-4">
                                <span>Week 1</span>
                                <span>Week 2</span>
                                <span>Week 3</span>
                                <span>Week 4</span>
                            </div>
                        </div>
                    </div>

                    {/* Lead Geography */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-[#1f2937] dark:text-white mb-6">Lead Geography</h3>

                        <div className="space-y-5 flex-1">
                            {[
                                { label: 'New York, NY', value: 35 },
                                { label: 'Miami, FL', value: 28 },
                                { label: 'Los Angeles, CA', value: 20 },
                                { label: 'Austin, TX', value: 12 },
                                { label: 'International', value: 5 },
                            ].map((item, i) => (
                                <motion.div key={i} whileHover={{ scale: 1.02 }} className="group cursor-default">
                                    <div className="flex justify-between text-sm font-semibold text-[#1f2937] dark:text-white mb-2">
                                        <span>{item.label}</span>
                                        <span className="text-[#d4af37]">{item.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            className="h-full bg-[#d4af37] rounded-full group-hover:bg-[#b08d2b] transition-colors"
                                        ></motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-3.5 bg-gray-50 hover:bg-[#d4af37] hover:text-white dark:bg-gray-700/50 dark:hover:bg-[#d4af37] text-sm font-bold text-gray-500 dark:text-gray-300 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group">
                            <MdMap className="text-lg group-hover:scale-110 transition-transform" /> View Heatmap Detail
                        </button>
                    </div>
                </motion.div>

                {/* Bottom Table: Top Performing Listings */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-[#1f2937] dark:text-white">Top Performing Listings</h3>
                        <button className="text-[#d4af37] text-sm font-bold hover:underline hover:text-[#b08d2b] transition-colors">View All Stats</button>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <div className="col-span-12 md:col-span-4">Property</div>
                        <div className="hidden md:block md:col-span-2">Views</div>
                        <div className="hidden md:block md:col-span-2">Inquiries</div>
                        <div className="hidden md:block md:col-span-2">Engagement</div>
                        <div className="hidden md:block md:col-span-2 text-right">Trend</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-3 mt-4">
                        {[
                            { title: 'The Penthouse at Azure', location: 'Miami Beach, FL', views: '12,402', inquiries: '84', score: 92, trend: 18, color: 'bg-[#569886]' },
                            { title: 'The Glass Estate', location: 'Los Angeles, CA', views: '8,914', inquiries: '42', score: 78, trend: 12, color: 'bg-[#6abca6]' },
                            { title: 'Skyline Duplex', location: 'New York, NY', views: '6,240', inquiries: '31', score: 81, trend: -3, color: 'bg-[#67847c]' },
                            { title: 'Villa Mediterraneo', location: 'Naples, FL', views: '4,105', inquiries: '22', score: 65, trend: 8, color: 'bg-[#4a8274]' },
                            { title: 'Urban Loft', location: 'Chicago, IL', views: '3,200', inquiries: '18', score: 55, trend: 5, color: 'bg-[#569886]' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ scale: 1.005, backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                                className="grid grid-cols-12 gap-4 items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                            >
                                <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                                    <div className={`size-12 rounded-xl ${item.color} shrink-0 flex items-center justify-center`}>
                                        <MdHome className="text-white opacity-50 text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#1f2937] dark:text-white mb-0.5">{item.title}</h4>
                                        <p className="text-xs text-gray-400">{item.location}</p>
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-2 text-sm font-bold text-[#1f2937] dark:text-white">{item.views}</div>
                                <div className="col-span-6 md:col-span-2 text-sm font-bold text-[#1f2937] dark:text-white">{item.inquiries}</div>
                                <div className="col-span-12 md:col-span-2 flex items-center gap-3">
                                    <span className="text-sm font-bold">{item.score / 10}</span>
                                    <div className="h-2 flex-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.score}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-[#d4af37]"
                                        ></motion.div>
                                    </div>
                                </div>
                                <div className={`col-span-12 md:col-span-2 text-right text-xs font-bold ${item.trend > 0 ? 'text-green-500' : 'text-red-500'} flex items-center justify-end gap-1`}>
                                    {item.trend > 0 ? <MdArrowUpward /> : <MdArrowDownward />}
                                    {Math.abs(item.trend)}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default InsightsPage;
