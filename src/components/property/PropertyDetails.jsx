'use client';

import { MdLocationOn, MdKingBed, MdBathtub, MdStraighten, MdWineBar } from 'react-icons/md';

const PropertyDetails = ({ property }) => {
    return (
        <div className="col-span-8">
            {/* Heading and Price */}
            <div className="flex justify-between items-start mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
                <div>
                    <h1 className="text-5xl font-black mb-3 tracking-tighter">{property.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg flex items-center gap-2">
                        <MdLocationOn className="text-primary" />
                        {property.address}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-primary text-3xl font-black">{property.price}</p>
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mt-1">Ref ID: {property.refId}</p>
                </div>
            </div>

            {/* Description */}
            <section className="mb-16">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-primary"></span>
                    The Experience
                </h3>
                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    <p>{property.description1}</p>
                    <p>{property.description2}</p>
                </div>
            </section>

            {/* Amenities Grid */}
            <section className="mb-16">
                <h3 className="text-xl font-bold mb-8">Curated Amenities</h3>
                <div className="grid grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center text-center gap-3">
                        <MdKingBed className="text-primary text-3xl" />
                        <div>
                            <p className="font-bold">{property.beds} Bedrooms</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">En-suite</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center text-center gap-3">
                        <MdBathtub className="text-primary text-3xl" />
                        <div>
                            <p className="font-bold">{property.baths} Baths</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Designer Finish</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center text-center gap-3">
                        <MdStraighten className="text-primary text-3xl" />
                        <div>
                            <p className="font-bold">{property.sqft} sqft</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Interior space</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center text-center gap-3">
                        <MdWineBar className="text-primary text-3xl" />
                        <div>
                            <p className="font-bold">Wine Cellar</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Climate Controlled</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Placeholder */}
            <section className="mb-16">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">The Neighborhood</h3>
                    <span className="text-primary font-bold text-sm">Walk Score: 98</span>
                </div>
                <div className="w-full h-96 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative shadow-inner">
                    <div
                        className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWKjWBFrXbe_9RlN4OyoU7hAVKVaZecUU-N149oezTubEKn1hpWq_iOzRXHrIdYo-kr8igfC18O52XQFDZjxvY1fMrK9j-x3xXH_jzKn5IiIA-KbwwNScww7GcW03ABBVNpTanARrJNPJArTc-H-cdVdk8_whq2B2-FSFSdOeVjnWQ-N8UeO7NWguEgUxhhciooQp9UUXQfzqH7HQwX9RQff7AfhVNe_SGrDgAAUqXzhVtskEj-4S8OmQfSlWqfuZ7iDPYxr6_jVZb')` }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <MdLocationOn className="text-primary text-5xl drop-shadow-[0_0_10px_rgba(212,175,53,0.8)]" />
                            <div className="absolute top-0 left-0 w-full h-full animate-ping bg-primary rounded-full opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PropertyDetails;
