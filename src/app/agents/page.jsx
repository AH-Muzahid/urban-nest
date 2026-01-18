import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function AgentsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl font-black text-charcoal mb-8">Our Agents</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Placeholder Cards */}
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                            <h3 className="text-xl font-bold text-charcoal">Agent Name {i}</h3>
                            <p className="text-gray-500 text-sm">Real Estate Specialist</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Footer /> */}
        </main>
    );
}
