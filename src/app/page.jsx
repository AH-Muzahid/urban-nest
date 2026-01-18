import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedListings from '@/components/sections/FeaturedListings';
import PropertyCategories from '@/components/sections/PropertyCategories';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';
import CallToAction from '@/components/sections/CallToAction';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedListings />
        <PropertyCategories />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
