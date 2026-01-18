'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedProperties } from '@/services/propertyService';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyCardSkeleton from '@/components/property/PropertyCardSkeleton';

const FeaturedListings = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getFeaturedProperties();
                setProperties(data);
            } catch (error) {
                console.error('Failed to fetch featured properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return (
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
                        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[...Array(8)].map((_, index) => (
                        <PropertyCardSkeleton key={index} />
                    ))}
                </div>
            </section>
        );
    }


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section className="py-24 max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
                        Curated Portfolio
                    </span>
                    <h2 className="text-4xl font-extrabold tracking-tight">FEATURED LISTINGS</h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        href="/properties"
                        className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-charcoal dark:hover:text-white transition-colors inline-block"
                    >
                        VIEW ALL PROPERTIES
                    </Link>
                </motion.div>
            </div>

            {/* Property Cards Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
            >
                {properties.map((property) => (
                    <motion.div
                        key={property._id}
                        variants={cardVariants}
                    >
                        <PropertyCard property={property} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default FeaturedListings;
