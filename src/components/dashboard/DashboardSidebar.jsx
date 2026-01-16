'use client';

import Link from 'next/link';
import { MdDashboard, MdFormatListBulleted, MdAddCircle, MdPerson, MdAnalytics, MdLogout, MdDomain, MdChevronLeft, MdChevronRight, MdHome } from 'react-icons/md';
import { usePathname } from 'next/navigation';

const DashboardSidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse }) => {
    const pathname = usePathname();
    const isActive = (path) => pathname === path;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    ${isCollapsed ? 'w-20' : 'w-64'} 
                    bg-[#1f2937] text-white flex flex-col fixed h-full z-50 top-0 left-0
                    transition-all duration-300 ease-in-out shadow-2xl border-r border-white/10
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0
                `}
            >
                {/* Header */}
                <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'p-4 justify-center' : 'px-5 py-4 justify-between'}`}>
                    <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                        <div className="size-8 bg-[#d4af37] rounded-lg flex items-center justify-center text-[#1f2937] shrink-0">
                            <MdDomain className="text-xl" />
                        </div>
                        <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                            <h1 className="text-base font-bold tracking-tight leading-4">UrbanNest</h1>
                            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Agent Portal</p>
                        </div>
                    </div>
                </div>

                {/* Toggle Button for Desktop */}
                <button
                    onClick={toggleCollapse}
                    className="absolute -right-3 top-9 bg-[#d4af37] text-[#1f2937] rounded-full p-1 shadow-md hidden md:flex items-center justify-center hover:scale-110 transition-transform z-50"
                >
                    {isCollapsed ? <MdChevronRight /> : <MdChevronLeft />}
                </button>

                <nav className="flex-1 mt-2 space-y-1">
                    {[
                        { href: '/dashboard', icon: MdDashboard, label: 'Dashboard' },
                        { href: '/dashboard/listings', icon: MdFormatListBulleted, label: 'My Listings' },
                        { href: '/dashboard/add-property', icon: MdAddCircle, label: 'Add New' },
                        { href: '/dashboard/profile', icon: MdPerson, label: 'Profile' },
                        { href: '/dashboard/insights', icon: MdAnalytics, label: 'Insights' },
                        { href: '/', icon: MdHome, label: 'Home' },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            title={isCollapsed ? link.label : ''}
                            className={`
                                flex items-center gap-4 transition-all duration-200 
                                ${isCollapsed ? 'justify-center px-0 py-3' : 'px-6 py-3'}
                                ${isActive(link.href)
                                    ? `text-[#d4af37] bg-white/5 ${isCollapsed ? 'border-none' : 'border-l-4 border-[#d4af37]'}`
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent border-l-4'
                                }
                            `}
                        >
                            <link.icon className="text-lg shrink-0" />
                            <span className={`text-sm font-bold whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                {link.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                {/* Bottom Profile Section */}
                <div className="p-3 mt-auto">
                    <div className={`bg-[#2d3748] rounded-xl transition-all duration-300 border border-gray-700 ${isCollapsed ? 'p-2' : 'p-4'}`}>
                        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center mb-0' : 'mb-3'}`}>
                            <div className="size-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[#1f2937] font-bold shrink-0 text-xs">AT</div>
                            <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                                <h4 className="text-xs font-bold text-white">Alexander Thorne</h4>
                                <p className="text-[10px] text-gray-400">Senior Partner</p>
                            </div>
                        </div>
                        <button
                            className={`
                                w-full py-2 bg-[#1f2937] hover:bg-gray-800 rounded-lg text-[10px] font-bold text-gray-300 flex items-center justify-center gap-2 transition-colors border border-gray-700
                                ${isCollapsed ? 'hidden' : 'flex'}
                            `}
                        >
                            <MdLogout /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardSidebar;
