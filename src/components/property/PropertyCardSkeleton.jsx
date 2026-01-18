const PropertyCardSkeleton = ({ viewMode = 'grid' }) => {
    return (
        <div className={`bg-white rounded-2xl overflow-hidden shadow-sm flex ${viewMode === 'list' ? 'flex-col md:flex-row' : 'flex-col'}`}>
            {/* Image Placeholder */}
            <div className={`relative bg-gray-200 animate-pulse ${viewMode === 'list' ? 'h-48 md:h-auto md:w-2/5' : 'h-52'}`}>
                <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 rounded"></div>
            </div>

            {/* Content Placeholder */}
            <div className="p-4 flex flex-col flex-1 gap-3">
                {/* Header: Title & Price */}
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Description (List view) */}
                {viewMode === 'list' && (
                    <div className="space-y-2 mt-2 hidden md:block">
                        <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    </div>
                )}

                {/* Amenities */}
                <div className="border-t border-gray-100 mt-auto pt-3 flex items-center justify-between gap-2">
                    <div className="h-8 bg-gray-100 rounded-lg w-1/3 animate-pulse"></div>
                    <div className="h-8 bg-gray-100 rounded-lg w-1/3 animate-pulse"></div>
                    <div className="h-8 bg-gray-100 rounded-lg w-1/3 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCardSkeleton;
