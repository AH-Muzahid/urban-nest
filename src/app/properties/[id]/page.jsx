'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPropertyById } from '@/services/propertyService';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ContactAgentForm from '@/components/property/ContactAgentForm';
import Reviews from '@/components/property/Reviews';
import SimilarProperties from '@/components/property/SimilarProperties';

export default function PropertyDetailsPage() {
    const params = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchProperty = useCallback(async () => {
        try {
            const data = await getPropertyById(params.id);
            setProperty(data);
        } catch (error) {
            console.error('Failed to fetch property:', error);
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        if (params.id) {
            fetchProperty();
        }
    }, [params.id, fetchProperty]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
                </div>
            </>
        );
    }

    if (!property) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Property not found</h2>
                        <Link href="/properties" className="text-purple-600 hover:text-purple-700">
                            Back to properties
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
                <div className="max-w-7xl mx-auto px-6 pt-6 pb-12">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
                        <span>/</span>
                        <Link href="/properties" className="hover:text-purple-600 transition">Properties</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{property.title}</span>
                    </nav>

                    {/* Image Gallery */}
                    <div className="mb-12">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-4">
                            <Image
                                src={property.images?.[currentImageIndex] || '/placeholder-property.jpg'}
                                alt={property.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            {property.images?.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % property.images.length)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
                                    >
                                        →
                                    </button>
                                </>
                            )}
                        </div>

                        {property.images?.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto">
                                {property.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition ${index === currentImageIndex ? 'border-purple-600' : 'border-transparent'
                                            }`}
                                    >
                                        <Image src={image} alt={`${property.title} ${index + 1}`} fill className="object-cover" sizes="96px" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                        {property.type}
                                    </span>
                                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                        {property.status}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">{property.title}</h1>
                                <p className="text-xl text-gray-600 flex items-center gap-2">
                                    📍 {property.location}
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{property.description}</p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Features</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">🛏️</span>
                                        <div>
                                            <p className="text-sm text-gray-500">Bedrooms</p>
                                            <p className="font-semibold text-gray-900">{property.bedrooms || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">🚿</span>
                                        <div>
                                            <p className="text-sm text-gray-500">Bathrooms</p>
                                            <p className="font-semibold text-gray-900">{property.bathrooms || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">📐</span>
                                        <div>
                                            <p className="text-sm text-gray-500">Area</p>
                                            <p className="font-semibold text-gray-900">{property.area || 'N/A'} sqft</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-inner border border-gray-100">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                                <p className="mt-4 text-gray-600 text-sm flex items-center gap-2">
                                    <span className="text-xl">📍</span> {property.location}
                                </p>
                            </div>

                            <Reviews propertyId={property._id} />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-2">Price</p>
                                    <p className="text-4xl font-bold text-purple-600">${property.price?.toLocaleString()}</p>
                                </div>

                                <ContactAgentForm propertyId={property._id} ownerId={property.owner?._id} />

                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h3 className="font-semibold text-gray-900 mb-4">Property Details</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Property ID</span>
                                            <span className="font-medium text-gray-900">{property._id?.slice(-8)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Type</span>
                                            <span className="font-medium text-gray-900">{property.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Status</span>
                                            <span className="font-medium text-gray-900">{property.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SimilarProperties />
                </div>
            </main>
            <Footer />
        </>
    );
}
