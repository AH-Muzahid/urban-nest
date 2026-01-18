'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdArrowBack, MdArrowForward, MdLocationOn, MdImage, MdVilla, MdQuestionAnswer, MdClose } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import CounterInput from '@/components/ui/CounterInput';
import StepIndicator from '@/components/dashboard/StepIndicator';
import { addProperty } from '@/services/propertyService';
import dynamic from 'next/dynamic';

const LocationPicker = dynamic(() => import('@/components/ui/LocationPicker'), {
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 font-bold">Loading Map...</div>,
    ssr: false
});

const AddPropertyPage = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        listingType: 'Sale',
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
            setLoading(true);
            try {
                await addProperty({
                    ...formData,
                    type: formData.type.toLowerCase(),
                    listingType: formData.listingType.toLowerCase(),
                    area: formData.sqft, // map sqft to area
                    price: Number(formData.price.replace(/,/g, '')), // ensure number
                    country: 'USA', // basic default
                    state: 'CA', // basic default
                    zip: '90210', // basic default
                    coordinates: formData.coordinates
                });
                router.push('/dashboard/listings');
            } catch (error) {
                toast.error('Failed to create property: ' + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSaveDraft = async () => {
        if (!formData.title) {
            toast.error('Please enter at least a title to save a draft.');
            return;
        }
        setLoading(true);
        try {
            await addProperty({
                ...formData,
                type: formData.type.toLowerCase(),
                area: formData.sqft || 0,
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
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black font-display text-charcoal dark:text-gray-100 pb-32">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 md:px-8 py-4 transition-all">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-1">Add New Property</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Create a high-impact listing for the luxury market.</p>
                    </div>
                    <div>
                        <button
                            onClick={handleSaveDraft}
                            disabled={loading}
                            className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all w-full md:w-auto disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Draft'}
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

                                    <div>
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block mb-3">Listing Status</label>
                                        <div className="flex gap-4">
                                            {['Sale', 'Rent'].map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => handleInputChange('listingType', type)}
                                                    className={`flex-1 py-4 rounded-xl font-bold border transition-all ${(formData.listingType || 'Sale') === type
                                                        ? 'bg-[#1f2937] text-white border-[#1f2937] shadow-lg scale-[1.02]'
                                                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'
                                                        }`}
                                                >
                                                    For {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

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

                                {/* Preset Images */}
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Add (Demo Presets)</p>
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {[
                                            'https://lh3.googleusercontent.com/aida-public/AB6AXuDB3eq9TogcTAGh4H1AkFsL_nY-abJDp71wTiUA4apdu3VBebXjapsCeusC02FR3427k34rdzz5EcgP4gbCpvLIbK317euVr2aJUD3vowbkeEeQaur7iuTxvL_esxP3EswvZRpH9F6f-HFOQarv2RRIDEO1H9aQHu1kxAGxuYoAvA_E88NqBr1I0jYSzX8oz2mNo2uNJePhTs22GOLGngVC4nnxievKfugBXJFFb1aA9K_amKDNBGQRKCmIPS9KJ0hiiRPrOEA3zb_l',
                                            'https://lh3.googleusercontent.com/aida-public/AB6AXuArVE9yx_RLpQUNHXarFP7mVi9egYBVaUerO0qijCCKoom3gWXVzV1PHQih6pMPCYaEEMQWV42nVnouBExtgrcIPaovevmLhZt2iW-JEYnTBkamGO75cTh0UuWgCkM1o-gkXtk9pJoJ_DILnVW37OJDt-9PunRhHbv94EInAQun2o-HTqDfJ0jyjErtiOtQH3y_0WEGXH2gXsCg-iOwWA3dhlOYZADzrCEoIvQoR3DXzqje_L6E-YLaceH2Rk5B-UZ_-hjuFiL9_LaU',
                                            'https://lh3.googleusercontent.com/aida-public/AB6AXuDV0QTzAeKto5enw0mBCBNjSaUZqxFlHjD3JpJRFbd2SLTbUNopr2DrFC5hCURWpSHOSvIZEuyJUg0eYK7G9esx7jjdYrKyfTT1ZTXtGd1T8NEzn42HgW19bo0wI1HU6y1_f9j-4o5B3HOxpf6IsLVvnWG6AycJ6EzreuataVUQVeTqlC7KOB0w9d7n5ZFojnIcUYL5QgkDoKj7xrOe5ByFP8qyAaC6H8qmiFx8tCOgN8uEo6jV8CEPhm1byXPLIn2P7uMllAfd_BmU'
                                        ].map((url, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setFormData(prev => ({ ...prev, images: [...prev.images, url] }))}
                                                className="h-16 w-24 rounded-lg overflow-hidden border border-gray-200 hover:border-[#d4af37] transition-all shrink-0"
                                            >
                                                <img src={url} alt="Preset" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
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
                            {currentStep === 4 ? (loading ? 'Publishing...' : 'Publish Listing') : 'Continue to Next Step'} <MdArrowForward className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Bottom Preview Cards - Only show on Step 1 */}
                {currentStep === 1 && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 pointer-events-none">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex items-center gap-5 shadow-sm">
                            <div className="size-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                <MdLocationOn className="text-xl" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">COMING UP</p>
                                <h4 className="font-bold text-sm">Location Mapping</h4>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex items-center gap-5 shadow-sm">
                            <div className="size-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                <MdImage className="text-xl" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">COMING UP</p>
                                <h4 className="font-bold text-sm">Media Gallery</h4>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 flex items-center gap-5 shadow-sm">
                            <div className="size-12 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                                <MdVilla className="text-xl" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">COMING UP</p>
                                <h4 className="font-bold text-sm">Amenity Grid</h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Help */}
            <div className="fixed right-10 bottom-10 z-50">
                <button className="bg-charcoal dark:bg-white text-white dark:text-charcoal size-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                    <MdQuestionAnswer className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default AddPropertyPage;
