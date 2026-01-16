'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MdArrowBack, MdArrowForward, MdLocationOn, MdImage, MdVilla, MdQuestionAnswer } from 'react-icons/md';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import CounterInput from '@/components/ui/CounterInput';
import StepIndicator from '@/components/dashboard/StepIndicator';

const AddPropertyPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Penthouse',
        price: '',
        description: '',
        bedrooms: 4,
        bathrooms: 3.5,
        sqft: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
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
                        <button className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all w-full md:w-auto">
                            Save Draft
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
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-20 text-center">
                            <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                                <MdLocationOn className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Location Setup</h3>
                            <p className="text-gray-500">Map integration and address details coming soon.</p>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 py-20 text-center">
                            <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                                <MdImage className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Media Gallery</h3>
                            <p className="text-gray-500">Image upload and gallery management coming soon.</p>
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
                            {currentStep === 4 ? 'Publish Listing' : 'Continue to Next Step'} <MdArrowForward className="text-lg" />
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
