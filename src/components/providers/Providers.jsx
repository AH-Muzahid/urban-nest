'use client';

import { ComparisonProvider } from '@/context/ComparisonContext';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }) {
    return (
        <ComparisonProvider>
            {children}
            <Toaster position="bottom-right" />
        </ComparisonProvider>
    );
}