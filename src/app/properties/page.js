'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import SidebarFilters from '@/components/property/SidebarFilters';
import PropertyCard from '@/components/property/PropertyCard';
import MapViewToggle from '@/components/property/MapViewToggle';
import { MdGridView, MdViewList, MdClose, MdKeyboardArrowDown, MdFilterList } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const PropertiesPage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const properties = [
        {
            id: 1,
            title: 'The Azure Penthouse, Belgrade',
            location: 'London, UK',
            price: '$4,250,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArVE9yx_RLpQUNHXarFP7mVi9egYBVaUerO0qijCCKoom3gWXVzV1PHQih6pMPCYaEEMQWV42nVnouBExtgrcIPaovevmLhZt2iW-JEYnTBkamGO75cTh0UuWgCkM1o-gkXtk9pJoJ_DILnVW37OJDt-9PunRhHbv94EInAQun2o-HTqDfJ0jyjErtiOtQH3y_0WEGXH2gXsCg-iOwWA3dhlOYZADzrCEoIvQoR3DXzqje_L6E-YLaceH2Rk5B-UZ_-hjuFiL9_LaU',
            beds: 4,
            baths: 5,
            sqft: '5,450',
            featured: true,
            new: true,
        },
        {
            id: 2,
            title: 'Shadow Creek Estate',
            location: 'Los Angeles, CA',
            price: '$8,900,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfK2RDWAgLo0Tps6L6ujfdnQRDWXbJWHGylVusgJRXd4-suNtMqgdSHo8PRXBQp7h0eSxx6SRGZFulrWsg5Ot0VMquR9NFXtIxzjJc48VU2z6xLGiz7AnBJTJY4fKK6bdZ6ibdENnBk3DkjnxlLVNxJC_7jgKBuKoqozI4nLVpbN47tratA-SJTaZCL187ixlZFylt_C3Hdldga6kAGGClZuzoOFDpdTtr0rN8wmr_riq8K7Er_LhAsZlnjc6I2zBVXnRng28O9bvh',
            beds: 6,
            baths: 8,
            sqft: '12,000',
            featured: false,
            new: false,
        },
        {
            id: 3,
            title: 'Peak View Chalet',
            location: 'Aspen, CO',
            price: '$12,500,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBySKyNSW1pirSzE-cCwszOzKMMxdtDBh-Zu0YduCsGRX1fgArUwwtcQD5fv6GV6hPiqcLNMMAyYLNQYp4DFHo0LcrGkWg4B5T9m7d3NDxFiaYloDwchdg_ZKWBFrbBEuCfQGURH5AM5imrPXu8EO-i2vXLDWtD99KltkxiLrw_k2boO4UTzDXyWrc0lMHNS4KO6xy-F3TBfn13Sl8uS6T7Jgt0wtGVQtaF5giA1Qvcf8fpASJLfUtgGd5LbGfiypxPcrcE82UCTQfJ',
            beds: 5,
            baths: 6,
            sqft: '5,800',
            featured: false,
            new: false,
        },
        {
            id: 4,
            title: 'The Heritage Manor',
            location: 'Greenwich, CT',
            price: '$7,150,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8hsyumFyuy_ZI9b7QO5UeVn6FMcgQS41LRxcOB_nzihT4RcXjHdC3djtBEw-bide1SwUNGGaCX9xf8MVuCp1gSr3tq6kp-yi3O8GUMPzMzknoL5WuguKnurzuvk1JKgdCZ1kjP96GwVh_AilVq30I7d8-7ZlTRvGygTAFJRwPAf7DSd4-7HVpWOBrDua7hzHxiJVNF0fffpgHLO7k8ivl42MFSZFRH337pOhLGjtyLSMv2CnkRowiRXyo2hm39oHCWNNs47moAUNl',
            beds: 8,
            baths: 7,
            sqft: '9,200',
            featured: false,
            new: false,
        },
        {
            id: 5,
            title: 'Ocean Edge Villa',
            location: 'Malibu, CA',
            price: '$15,200,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCATuFY8w4z06geRlBtdyepBAAtbFKSoyJ9utNvzxLWI_z-kHsNP7m_earCH-TBndEoT6DRfkGLaEYqahjNoS5ON926GebZqlkqOfsctnOpyaJqXahIdFguQJwugs1_kHZchvFB0Ia7jDmtDIipFaKbW2BHnPut4URQw_iLaqyB0GLAAMzszB3J0aACq389nq34yVbFVceOFhxRaUXxXMtiat0dx2bEElfFol0p0pJjAza43Kt3QnaoZbkLnUhs1sxIAKr-1Ca8Pr8Z',
            beds: 4,
            baths: 5,
            sqft: '4,100',
            featured: false,
            new: false,
        },
        {
            id: 6,
            title: 'The Palm Jumeirah Estate',
            location: 'Dubai, UAE',
            price: '$22,000,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUDklm3t4HKPyRgtXldfF54cE32P7XDIufmyblla7EbUqCZEIJA6i1Nue_J0DTsvfqY8bw-x9hUakD1nF_lW91d-upxbcUJb-sfPkBhzp8J0W1EtEzDBt8kkrNDq7RrxnZxCqor60QtsI_uW3WDbempDvqU-T-RawdxXzNusoc7JJ-28RBBte1f5kM6NwpiU88BXA4HqeYnMxbczWGDgk5jgwV8SWQOrXlbZdlOWabS4cd1Z13DocEvtoiYoleRDOC6v3GRzPx--zq',
            beds: 7,
            baths: 9,
            sqft: '15,000',
            featured: false,
            new: false,
        },
        {
            id: 7,
            title: 'The Haussmann Loft',
            location: 'Paris, FR',
            price: '$6,800,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeNDWtAZZVwhVmJ-KJlZSDW0gcBmu0v098J4PBt_q1lZBrltkEzN2HiksQl5Y67pf4ywgSvIPqkG777WCSQ_yB5lSs88SE-eQ_7IyWSjslYW_t5ct1CO6bKrq3daHqQSc5wHkH_M8QpXAvzURg969D67k2SVQxMBTr_zADbZb3G67HoHlaqRp4b5TjFY-prMASo_vWCCja46XlyJflXP6RyypG6SWMxKFLE7-wAPvsDSYmSnBVKAavdo6H-bTP-q7-kn3wKs__Qvn2',
            beds: 3,
            baths: 3,
            sqft: '2,800',
            featured: false,
            new: false,
        },
        {
            id: 8,
            title: 'Forest Sanctuary',
            location: 'Lake Tahoe, NV',
            price: '$3,400,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4vV39LEW2L2TZSOPVhKRBavfanMzwmBEQXEvUOTDSK7HbMVxbOrFQkfZ-y0dGggYLxH4qyRCXLa7ko0-PNZyar4AsAIR3n-jt0-zDfIcXZkfRsvGR0K8BDPgZSzViVgyfwKo-ojIcXcfmigAsggs172jlsb6jZ_wLGOePV3AsLnLdO_Sn9q8MXc7B3ce9N1ca16j1ti_AqlgZIwhiKq9e68fsMPgsxpJKgviua04VEOQ7K2_29X1tmoEwMOFb-1_5utFIOZ97Q74D',
            beds: 4,
            baths: 4,
            sqft: '3,100',
            featured: false,
            new: false,
        },
        {
            id: 9,
            title: 'Villa Azul',
            location: 'Ibiza, ES',
            price: '$9,750,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfrCkZqzng75mGPe7X0BbqhZu5mUIAawmcKOJmBLcRidyOtE8A1VZOCYR4YsCf1uHB8P1oi0TNJt3lnLj0_uLR3X7qnIWHS8H-xNT6IS6HEYZrSDv6Op0FbjYi79Vqgk2ZrAtDhSX_7swzpFhJwbtXLw2OxD5KILdisVSQutcVGwYkimzi3WwNL7jWz_CXfYKuPHCIq4mzlQFlabFK8_2jMvJ3Nwx_0c2AzMJvmqHT5G0pJ8PxIYNUon9H0ORuBH1WP511UDWWS9uB',
            beds: 5,
            baths: 6,
            sqft: '6,500',
            featured: false,
            new: false,
        },
    ];

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

            <main className="max-w-[1600px] mx-auto px-6 pt-32 pb-20 flex gap-12 relative">

                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-80 shrink-0 sticky top-32 h-[calc(100vh-160px)]">
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
                            <span className="bg-[#d4af35]/10 text-[#d4af35] border border-[#d4af35]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                Penthouse
                                <MdClose className="cursor-pointer hover:bg-black/10 rounded-full" />
                            </span>
                            <span className="bg-[#d4af35]/10 text-[#d4af35] border border-[#d4af35]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                $1.2M - $8.5M
                                <MdClose className="cursor-pointer hover:bg-black/10 rounded-full" />
                            </span>
                        </div>

                        <div className="flex items-center justify-between w-full md:w-auto gap-4">
                            {/* Mobile Filter Toggle Button */}
                            <button
                                onClick={() => setMobileFiltersOpen(true)}
                                className="lg:hidden flex items-center gap-2 bg-charcoal text-white dark:bg-white dark:text-charcoal px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg"
                            >
                                <MdFilterList className="text-lg" /> Filters
                            </button>

                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal' : 'text-gray-400 hover:text-charcoal dark:hover:text-white'}`}
                                    >
                                        <MdGridView />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-charcoal text-white dark:bg-white dark:text-charcoal' : 'text-gray-400 hover:text-charcoal dark:hover:text-white'}`}
                                    >
                                        <MdViewList />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-bold bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2.5 rounded-xl cursor-pointer hover:border-primary transition-all">
                                    Newest First <MdKeyboardArrowDown className="text-lg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Property Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-8"}
                    >
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} viewMode={viewMode} />
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <div className="mt-20 flex flex-col items-center gap-8">
                        <button className="bg-[#d4af35] hover:bg-[#b5952d] text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-[#d4af35]/30 tracking-wide transition-all transform hover:-translate-y-1">
                            Load More Listings
                        </button>

                        <div className="flex items-center gap-2">
                            <button className="size-10 rounded-full border-2 border-[#d4af35] text-[#d4af35] font-bold flex items-center justify-center">1</button>
                            <button className="size-10 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 font-bold flex items-center justify-center text-gray-500">2</button>
                            <button className="size-10 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 font-bold flex items-center justify-center text-gray-500">3</button>
                            <span className="text-gray-300">...</span>
                            <button className="size-10 rounded-full border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 font-bold flex items-center justify-center text-gray-500">15</button>
                        </div>
                    </div>
                </div>
            </main>

            <MapViewToggle />
            <Footer />
        </div>
    );
};

export default PropertiesPage;
