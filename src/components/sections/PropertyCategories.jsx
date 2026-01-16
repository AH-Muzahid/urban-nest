'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PropertyCategories = () => {
    const categories = [
        {
            id: 1,
            title: 'Residential',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArVE9yx_RLpQUNHXarFP7mVi9egYBVaUerO0qijCCKoom3gWXVzV1PHQih6pMPCYaEEMQWV42nVnouBExtgrcIPaovevmLhZt2iW-JEYnTBkamGO75cTh0UuWgCkM1o-gkXtk9pJoJ_DILnVW37OJDt-9PunRhHbv94EInAQun2o-HTqDfJ0jyjErtiOtQH3y_0WEGXH2gXsCg-iOwWA3dhlOYZADzrCEoIvQoR3DXzqje_L6E-YLaceH2Rk5B-UZ_-hjuFiL9_LaU',
            href: '/properties',
        },
        {
            id: 2,
            title: 'Commercial',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUDklm3t4HKPyRgtXldfF54cE32P7XDIufmyblla7EbUqCZEIJA6i1Nue_J0DTsvfqY8bw-x9hUakD1nF_lW91d-upxbcUJb-sfPkBhzp8J0W1EtEzDBt8kkrNDq7RrxnZxCqor60QtsI_uW3WDbempDvqU-T-RawdxXzNusoc7JJ-28RBBte1f5kM6NwpiU88BXA4HqeYnMxbczWGDgk5jgwV8SWQOrXlbZdlOWabS4cd1Z13DocEvtoiYoleRDOC6v3GRzPx--zq',
            href: '/properties',
        },
        {
            id: 3,
            title: 'Luxury Collection',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV0QTzAeKto5enw0mBCBNjSaUZqxFlHjD3JpJRFbd2SLTbUNopr2DrFC5hCURWpSHOSvIZEuyJUg0eYK7G9esx7jjdYrKyfTT1ZTXtGd1T8NEzn42HgW19bo0wI1HU6y1_f9j-4o5B3HOxpf6IsLVvnWG6AycJ6EzreuataVUQVeTqlC7KOB0w9d7n5ZFojnIcUYL5QgkDoKj7xrOe5ByFP8qyAaC6H8qmiFx8tCOgN8uEo6jV8CEPhm1byXPLIn2P7uMllAfd_BmU',
            href: '/properties',
        },
    ];

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
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
            },
        },
    };

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-extrabold tracking-tight mb-12 text-center"
                >
                    EXPLORE OUR PORTFOLIOS
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {categories.map((category) => (
                        <motion.div key={category.id} variants={cardVariants}>
                            <Link
                                href={category.href}
                                className="relative h-64 rounded-xl overflow-hidden group shadow-lg block"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('${category.image}')`,
                                    }}
                                />

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />

                                {/* Title */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="text-white text-2xl font-black uppercase tracking-widest"
                                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                                    >
                                        {category.title}
                                    </motion.span>
                                </div>

                                {/* Decorative Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-all duration-500" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PropertyCategories;
