'use client';

import { motion } from 'framer-motion';
import { MdMap } from 'react-icons/md';

const MapViewToggle = () => {
    return (
        <motion.button
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-2xl z-40"
        >
            <MdMap className="text-lg" />
            Map View
        </motion.button>
    );
};

export default MapViewToggle;
