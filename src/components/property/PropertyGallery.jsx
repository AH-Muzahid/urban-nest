'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdArrowBack, MdArrowForward } from 'react-icons/md';

const PropertyGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (index) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);

    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
                <div className="md:col-span-8 h-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full bg-cover bg-center shadow-2xl relative overflow-hidden group cursor-pointer"
                        style={{ backgroundImage: `url('${images[0]}')` }}
                        onClick={() => openLightbox(0)}
                    >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500"></div>
                    </motion.div>
                </div>
                <div className="md:col-span-4 flex md:flex-col gap-4 h-full">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 bg-cover bg-center shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        style={{ backgroundImage: `url('${images[1]}')` }}
                        onClick={() => openLightbox(1)}
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex-1 bg-cover bg-center shadow-lg relative group cursor-pointer hover:opacity-90 transition-opacity"
                        style={{ backgroundImage: `url('${images[2]}')` }}
                        onClick={() => openLightbox(2)}
                    >
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform pointer-events-none">
                                View All Photos
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                        >
                            <MdClose className="text-2xl" />
                        </button>

                        <button
                            onClick={prevImage}
                            className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors hover:scale-110 hidden md:block"
                        >
                            <MdArrowBack className="text-3xl" />
                        </button>

                        <motion.img
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={images[selectedImage]}
                            alt="Property Fullscreen"
                            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-sm pointer-events-none select-none"
                        />

                        <button
                            onClick={nextImage}
                            className="absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors hover:scale-110 hidden md:block"
                        >
                            <MdArrowForward className="text-3xl" />
                        </button>

                        {/* Mobile Navigation */}
                        <div className="absolute bottom-10 flex gap-8 md:hidden">
                            <button onClick={prevImage} className="p-4 bg-white/10 rounded-full text-white"><MdArrowBack /></button>
                            <button onClick={nextImage} className="p-4 bg-white/10 rounded-full text-white"><MdArrowForward /></button>
                        </div>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-bold tracking-widest">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PropertyGallery;
