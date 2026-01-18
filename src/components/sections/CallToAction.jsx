import Link from 'next/link';

const CallToAction = () => {
    return (
        <section className="py-20 bg-charcoal text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Ready to Find Your <span className="text-[#d4af37]">Dream Home</span>?
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of satisfied homeowners who found their perfect match with UrbanNest. Experience the future of real estate today.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        href="/properties?status=sale"
                        className="bg-[#d4af37] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-charcoal transition-all shadow-xl shadow-[#d4af37]/20"
                    >
                        Browse Properties
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-charcoal transition-all"
                    >
                        Contact an Agent
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
