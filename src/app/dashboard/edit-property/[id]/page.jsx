'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { MdArrowBack, MdArrowForward, MdLocationOn, MdImage, MdVilla, MdQuestionAnswer, MdClose } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import CounterInput from '@/components/ui/CounterInput';
import StepIndicator from '@/components/dashboard/StepIndicator';
import { getPropertyById, updateProperty } from '@/services/propertyService';
import dynamic from 'next/dynamic';

const LocationPicker = dynamic(() => import('@/components/ui/LocationPicker'), {
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 font-bold">Loading Map...</div>,
    ssr: false
});

const EditPropertyPage = () => {
    const router = useRouter();
    const params = useParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Penthouse',
        price: '',
        description: '',
        bedrooms: 4,
        bathrooms: 3.5,
        sqft: '',
        location: '',
        coordinates: { lat: 0, lng: 0 },
        images: []
    });

    useEffect(() => {
        if (params.id) {
            fetchProperty();
        }
    }, [params.id]);

    const fetchProperty = async () => {
        try {
            const data = await getPropertyById(params.id);
            // Capitalize type for select match
            const type = data.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : 'Penthouse';

            setFormData({
                title: data.title || '',
                type: type,
                price: data.price ? data.price.toString() : '',
                description: data.description || '',
                bedrooms: data.bedrooms || 0,
                bathrooms: data.bathrooms || 0,
                sqft: data.area ? data.area.toString() : '',
                location: data.location || '',
                coordinates: data.coordinates || { lat: 0, lng: 0 },
                images: data.images || []
            });
        } catch (error) {
            console.error('Failed to fetch property:', error);
            toast.error('Failed to load property details.');
            router.push('/dashboard/listings');
        } finally {
            setLoading(false);
        }
    };


    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = (step) => {
        if (step === 1) {
            if (!formData.title) return 'Please enter a listing title';
            if (!formData.price) return 'Please enter an asking price';
            if (!formData.description) return 'Please enter a description';
        }
        if (step === 2) {
            if (!formData.location) return 'Please enter a property address';
        }
        if (step === 3) {
            if (formData.images.length === 0) return 'Please add at least one image';
        }
        return null;
    };

    const handleNext = async () => {
        const error = validateStep(currentStep);
        if (error) {
            toast.error(error);
            return;
        }

        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Submit
            setSubmitting(true);
            try {
                await updateProperty(params.id, {
                    ...formData,
                    type: formData.type.toLowerCase(),
                    area: parseFloat(formData.sqft) || 0, // map sqft to area
                    price: Number(formData.price.replace(/,/g, '')), // ensure number
                    country: 'USA', // basic default
                    state: 'CA', // basic default
                    zip: '90210', // basic default
                    coordinates: formData.coordinates
                });
                toast.success('Property updated successfully!');
                router.push('/dashboard/listings');
            } catch (error) {
                toast.error('Failed to update property: ' + (error.response?.data?.message || error.message));
            } finally {
                setSubmitting(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSaveDraft = async () => {
        if (!formData.title) {
            toast.error('Please enter at least a title to save.');
            return;
        }
        setSubmitting(true);
        try {
            await updateProperty(params.id, {
                ...formData,
                type: formData.type.toLowerCase(),
                area: parseFloat(formData.sqft) || 0,
                price: Number((formData.price || '0').replace(/,/g, '')),
                country: 'USA',
                state: 'CA',
                zip: '90210',
                coordinates: formData.coordinates,
                status: 'draft'
            });
            toast.success('Draft saved successfully!');
            router.push('/dashboard/listings');
        } catch (error) {
            toast.error('Failed to save draft: ' + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d4af37]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black font-display text-charcoal dark:text-gray-100 pb-32">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 md:px-8 py-4 transition-all">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-1">Edit Property</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Update your listing details.</p>
                    </div>
                    <div>
                        <button
                            onClick={handleSaveDraft}
                            disabled={submitting}
                            className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all w-full md:w-auto disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : 'Save Draft'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="px-6 md:px-12 py-8 md:py-12 max-w-6xl mx-auto transition-all">
                {/* Progress Stepper */}
                <StepIndicator currentStep={currentStep} totalSteps={4} />

                {/* Main Form Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-12 space-y-12 transition-all">

                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            {/* Section 1 */}
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="size-8 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] font-serif italic font-bold text-lg">01</div>
                                    <h3 className="text-xl font-bold">Property Details</h3>
                                </div>

                                <div className="space-y-8">
                                    <FormInput
                                        label="Listing Title"
                                        placeholder="e.g. The Penthouse at Azure - Waterfront Living"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormSelect
                                            label="Property Type"
                                            options={['Penthouse', 'Villa', 'Estate', 'Mansion', 'Apartment']}
                                            value={formData.type}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                        />
                                        <FormInput
                                            label="Asking Price (USD)"
                                            placeholder="5,450,000"
                                            prefix="$"
                                            value={formData.price}
                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Compelling Description</label>
                                        <textarea
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-6 py-4 text-base focus:ring-2 focus:ring-[#d4af37]/50 placeholder:text-gray-300 dark:placeholder:text-gray-600 outline-none resize-none h-40"
                                            placeholder="Describe the lifestyle, architectural highlights, and unique selling points..."
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-100 dark:border-gray-800 my-12" />

                            {/* Section 2 */}
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="size-8 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] font-serif italic font-bold text-lg">02</div>
                                    <h3 className="text-xl font-bold">Vital Statistics</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <CounterInput
                                        label="Bedrooms"
                                        value={formData.bedrooms}
                                        onChange={(val) => handleInputChange('bedrooms', val)}
                                    />
                                    <CounterInput
                                        label="Bathrooms"
                                        value={formData.bathrooms}
                                        onChange={(val) => handleInputChange('bathrooms', val)}
                                    />

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Square Footage</label>
                                        <div className="relative">
                                            <input
                                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-6 py-4 text-base focus:ring-2 focus:ring-[#d4af37]/50 placeholder:text-gray-300 outline-none text-center"
                                                placeholder="4,200"
                                                type="text"
                                                value={formData.sqft}
                                                onChange={(e) => handleInputChange('sqft', e.target.value)}
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold tracking-widest">SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-10">
                            <div className="text-center mb-8">
                                <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <MdLocationOn className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Location Setup</h3>
                                <p className="text-gray-500 text-sm">Pinpoint your property&apos;s address for the map view.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                <div className="space-y-6">
                                    <FormInput
                                        label="Full Property Address"
                                        placeholder="e.g. 123 Luxury Lane, Beverly Hills, CA 90210"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                    />

                                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-xs leading-relaxed">
                                        <strong>Note:</strong> You can type the address above OR use the map to drop a pin. The address will update automatically.
                                    </div>
                                </div>

                                {/* Map Picker */}
                                <div className="w-full">
                                    <LocationPicker
                                        initialLocation={formData.coordinates}
                                        onLocationSelect={(data) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                location: data.address || prev.location,
                                                coordinates: { lat: data.lat, lng: data.lng }
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-10">
                            <div className="text-center mb-8">
                                <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <MdImage className="text-3xl" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Media Gallery</h3>
                                <p className="text-gray-500 text-sm">Add high-resolution images to showcase the property.</p>
                            </div>

                            <div className="space-y-8">
                                {/* Image Input */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Paste image URL here..."
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-6 py-4 text-sm focus:ring-2 focus:ring-[#d4af37]/50 placeholder:text-gray-300 dark:placeholder:text-gray-600 outline-none"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (e.target.value) {
                                                        setFormData(prev => ({ ...prev, images: [...prev.images, e.target.value] }));
                                                        e.target.value = '';
                                                    }
                                                }
                                            }}
                                            id="imageUrlInput"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const input = document.getElementById('imageUrlInput');
                                            if (input.value) {
                                                setFormData(prev => ({ ...prev, images: [...prev.images, input.value] }));
                                                input.value = '';
                                            }
                                        }}
                                        className="bg-[#1f2937] text-white px-6 rounded-xl font-bold text-sm hover:bg-black transition-colors"
                                    >
                                        Add Image
                                    </button>
                                </div>

                                {/* Included Images List */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-[4/3] group rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                            <img src={img} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <MdClose className="text-sm" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-10">
                            <h3 className="text-2xl font-bold mb-8 text-center">Review & Publish</h3>

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto border border-gray-100 dark:border-gray-700">
                                {/* Preview Image Header */}
                                <div className="h-64 w-full bg-gray-200 relative">
                                    {formData.images.length > 0 ? (
                                        <img src={formData.images[0]} alt="Property Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <span className="text-sm font-bold uppercase tracking-widest">No Cover Image</span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Asking Price</p>
                                        <p className="text-xl font-black text-[#d4af37]">${formData.price}</p>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div>
                                        <h4 className="text-xl font-bold mb-1">{formData.title}</h4>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <MdLocationOn /> {formData.location}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100 dark:border-gray-700">
                                        <div className="text-center">
                                            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Bedrooms</p>
                                            <p className="font-bold text-lg">{formData.bedrooms}</p>
                                        </div>
                                        <div className="text-center border-x border-gray-100 dark:border-gray-700">
                                            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Bathrooms</p>
                                            <p className="font-bold text-lg">{formData.bathrooms}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Sq. Footage</p>
                                            <p className="font-bold text-lg">{formData.sqft}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">Description Preview</p>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                            {formData.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-8 flex flex-col-reverse md:flex-row justify-between items-center border-t border-gray-100 dark:border-gray-800 mt-8 gap-4">
                        {currentStep > 1 ? (
                            <button onClick={handleBack} className="text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
                                <MdArrowBack /> Back to Previous Step
                            </button>
                        ) : (
                            <Link href="/dashboard" className="text-sm font-bold text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
                                <MdArrowBack /> Back to Listings
                            </Link>
                        )}

                        <button
                            onClick={handleNext}
                            className="bg-[#d4af37] hover:bg-[#b08d2b] text-white dark:text-black font-bold text-sm px-10 py-4 rounded-full flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all transform hover:-translate-y-1 w-full md:w-auto"
                        >
                            {currentStep === 4 ? (submitting ? 'Updating...' : 'Update Listing') : 'Continue to Next Step'} <MdArrowForward className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPropertyPage;
