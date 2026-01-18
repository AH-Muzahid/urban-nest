import Link from 'next/link';
import { MdArrowForward } from 'react-icons/md';

const CallToAction = () => {
    return (
        <section className="py-24 bg-[#1a1a1a] text-center relative overflow-hidden">
            {/* Subtle Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4af37] opacity-5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                    Ready to Find Your <span className="text-[#d4af37]">Dream Home?</span>
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of satisfied homeowners who found their perfect match with UrbanNest. Experience the future of real estate today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/properties?status=sale"
                        className="flex items-center gap-2 bg-[#d4af37] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#1a1a1a] transition-all"
                    >
                        Browse Properties
                        <MdArrowForward />
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 rounded-full font-bold text-lg text-white border-2 border-white/20 hover:bg-white hover:text-[#1a1a1a] transition-all"
                    >
                        Contact Agent
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
