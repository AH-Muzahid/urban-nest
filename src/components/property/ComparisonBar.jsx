'use client';

import { useComparison } from '@/context/ComparisonContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdCompareArrows } from 'react-icons/md';
import Link from 'next/link';

const ComparisonBar = () => {
    const { compareList, removeFromCompare, clearCompare } = useComparison();

    return (
        <AnimatePresence>
            {compareList.length > 0 && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-charcoal border-t border-gray-200 dark:border-gray-700 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] py-4 px-6 md:px-12"
                >
                    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 shrink-0">
                                Comparing <span className="text-primary">{compareList.length}</span>/3
                            </h4>
                            <div className="flex items-center gap-4">
                                {compareList.map((item) => (
                                    <div key={item.id} className="relative group shrink-0">
                                        <div className="size-12 rounded-lg bg-cover bg-center border border-gray-200 dark:border-gray-700" style={{ backgroundImage: `url('${item.image}')` }} />
                                        <button
                                            onClick={() => removeFromCompare(item.id)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                        >
                                            <MdClose className="text-xs" />
                                        </button>
                                        <div className="absolute top-full left-0 mt-1 w-32 truncate text-[10px] font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                            <button
                                onClick={clearCompare}
                                className="text-xs font-bold text-gray-400 hover:text-charcoal dark:hover:text-white transition-colors"
                            >
                                Clear All
                            </button>
                            <Link
                                href="/compare"
                                className="bg-primary hover:bg-[#b5952d] text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1"
                            >
                                <MdCompareArrows className="text-xl" />
                                Compare Properties
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ComparisonBar;
