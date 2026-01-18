'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PropertyCategories = () => {
    const categories = [
        {
            id: 1,
            title: 'Residential',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArVE9yx_RLpQUNHXarFP7mVi9egYBVaUerO0qijCCKoom3gWXVzV1PHQih6pMPCYaEEMQWV42nVnouBExtgrcIPaovevmLhZt2iW-JEYnTBkamGO75cTh0UuWgCkM1o-gkXtk9pJoJ_DILnVW37OJDt-9PunRhHbv94EInAQun2o-HTqDfJ0jyjErtiOtQH3y_0WEGXH2gXsCg-iOwWA3dhlOYZADzrCEoIvQoR3DXzqje_L6E-YLaceH2Rk5B-UZ_-hjuFiL9_LaU',
            href: '/properties?type=house',
        },
        {
            id: 2,
            title: 'Commercial',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUDklm3t4HKPyRgtXldfF54cE32P7XDIufmyblla7EbUqCZEIJA6i1Nue_J0DTsvfqY8bw-x9hUakD1nF_lW91d-upxbcUJb-sfPkBhzp8J0W1EtEzDBt8kkrNDq7RrxnZxCqor60QtsI_uW3WDbempDvqU-T-RawdxXzNusoc7JJ-28RBBte1f5kM6NwpiU88BXA4HqeYnMxbczWGDgk5jgwV8SWQOrXlbZdlOWabS4cd1Z13DocEvtoiYoleRDOC6v3GRzPx--zq',
            href: '/properties?type=land',
        },
        {
            id: 3,
            title: 'Luxury Collection',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV0QTzAeKto5enw0mBCBNjSaUZqxFlHjD3JpJRFbd2SLTbUNopr2DrFC5hCURWpSHOSvIZEuyJUg0eYK7G9esx7jjdYrKyfTT1ZTXtGd1T8NEzn42HgW19bo0wI1HU6y1_f9j-4o5B3HOxpf6IsLVvnWG6AycJ6EzreuataVUQVeTqlC7KOB0w9d7n5ZFojnIcUYL5QgkDoKj7xrOe5ByFP8qyAaC6H8qmiFx8tCOgN8uEo6jV8CEPhm1byXPLIn2P7uMllAfd_BmU',
            href: '/properties?minPrice=1000000',
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
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]"
                >
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.id}
                            variants={cardVariants}
                            className={`relative rounded-3xl overflow-hidden group shadow-lg ${idx === 0 ? 'md:col-span-8 md:row-span-2' :
                                    idx === 1 ? 'md:col-span-4 md:row-span-1' :
                                        'md:col-span-4 md:row-span-1'
                                }`}
                        >
                            <Link href={category.href} className="block w-full h-full relative min-h-[300px] md:min-h-0">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    style={{
                                        backgroundImage: `url('${category.image}')`,
                                    }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] mb-2">Collection 0{idx + 1}</p>
                                        <h3 className="text-white text-3xl font-black uppercase tracking-tight leading-none group-hover:text-[#d4af37] transition-colors">{category.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PropertyCategories;
