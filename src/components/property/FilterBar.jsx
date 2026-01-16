'use client';

export default function FilterBar({ filters, onFilterChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({
            ...filters,
            [name]: value,
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                        Search
                    </label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Search properties..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                </div>

                {/* Property Type */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    >
                        <option value="">All Types</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="villa">Villa</option>
                        <option value="land">Land</option>
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={filters.location}
                        onChange={handleChange}
                        placeholder="Enter location..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                </div>

                {/* Price Range */}
                <div>
                    <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                    </label>
                    <select
                        id="priceRange"
                        name="priceRange"
                        value={filters.priceRange}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    >
                        <option value="">All Prices</option>
                        <option value="0-200000">Under $200k</option>
                        <option value="200000-500000">$200k - $500k</option>
                        <option value="500000-1000000">$500k - $1M</option>
                        <option value="1000000+">$1M+</option>
                    </select>
                </div>
            </div>

            {/* Clear Filters */}
            {(filters.search || filters.type || filters.location || filters.priceRange) && (
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => onFilterChange({ search: '', type: '', location: '', priceRange: '' })}
                        className="px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
}
