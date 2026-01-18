import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-4xl font-black text-charcoal mb-6">Contact Us</h1>
                        <p className="text-gray-600 mb-8">Ready to start your journey? Get in touch with our team of experts today.</p>

                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg">Headquarters</h3>
                                <p className="text-gray-500">123 Luxury Lane, Beverly Hills, CA 90210</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg">Email & Phone</h3>
                                <p className="text-gray-500">concierge@urbannest.com</p>
                                <p className="text-gray-500">+1 (888) 555-0123</p>
                            </div>
                        </div>
                    </div>

                    <form className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Your Name" className="w-full bg-gray-50 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/20 transition-all" />
                            <input type="email" placeholder="Email Address" className="w-full bg-gray-50 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/20 transition-all" />
                            <textarea rows="4" placeholder="How can we help?" className="w-full bg-gray-50 px-4 py-3 rounded-xl outline-none focus:ring-2 ring-primary/20 transition-all"></textarea>
                            <button className="w-full bg-charcoal text-white font-bold py-4 rounded-xl hover:bg-black transition-colors">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <Footer /> */}
        </main>
    );
}
