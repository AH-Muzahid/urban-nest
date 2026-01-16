'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { MdMenu } from 'react-icons/md';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-charcoal dark:text-gray-100 antialiased font-display">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isCollapsed={isCollapsed}
                toggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            {/* Main Content Area */}
            <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
                {/* Mobile Header for Sidebar Toggle */}
                <div className="md:hidden sticky top-0 z-30 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
                    <div className="font-bold text-lg">UrbanNest</div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-charcoal dark:text-white"
                    >
                        <MdMenu className="text-2xl" />
                    </button>
                </div>

                <main>{children}</main>
            </div>
        </div>
    );
}
