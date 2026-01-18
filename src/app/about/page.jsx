import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-black text-charcoal mb-6">About UrbanNest</h1>
                <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                    We are redefining the luxury real estate experience. Founded on the principles of integrity, innovation, and exclusivity, UrbanNest connects discerning buyers with the world&apos;s most prestigious properties.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-charcoal mb-4">Our Mission</h2>
                        <p className="text-gray-500">To provide an unmatched level of service and expertise in the global real estate market.</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-charcoal mb-4">Our Vision</h2>
                        <p className="text-gray-500">To be the undisputed leader in luxury property technology and personalized service.</p>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </main>
    );
}
