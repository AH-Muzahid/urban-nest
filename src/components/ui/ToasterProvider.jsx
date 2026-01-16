'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#1f2937',
                    color: '#fff',
                    borderRadius: '0.5rem',
                },
                success: {
                    iconTheme: {
                        primary: '#d4af35',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
};

export default ToasterProvider;
