export default function Features() {
    const features = [
        {
            icon: '🔍',
            title: 'Smart Search',
            description: 'Find your perfect property with our advanced search filters and AI-powered recommendations.',
        },
        {
            icon: '🏆',
            title: 'Premium Listings',
            description: 'Access exclusive properties from verified sellers and trusted real estate agents.',
        },
        {
            icon: '💰',
            title: 'Best Prices',
            description: 'Get competitive pricing and transparent deals with no hidden fees.',
        },
        {
            icon: '🔒',
            title: 'Secure Transactions',
            description: 'Your data and transactions are protected with bank-level security.',
        },
        {
            icon: '📱',
            title: 'Mobile Ready',
            description: 'Browse properties on any device with our responsive design.',
        },
        {
            icon: '🤝',
            title: 'Expert Support',
            description: '24/7 customer support to help you every step of the way.',
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Urban Nest</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We provide everything you need to find, buy, or sell your dream property
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
