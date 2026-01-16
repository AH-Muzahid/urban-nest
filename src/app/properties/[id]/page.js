'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import AgentSidebar from '@/components/property/AgentSidebar';
import SimilarProperties from '@/components/property/SimilarProperties';
import { useParams } from 'next/navigation';

const PropertyPage = () => {
    const params = useParams();
    // In a real app, you would fetch data using params.id

    // Mock Data for "The Obsidian Penthouse"
    const property = {
        title: 'The Obsidian Penthouse',
        address: '123 Skyline Drive, Metropolitan District',
        price: '$4,250,000',
        refId: 'UN-88921',
        description1: 'A masterwork of contemporary architecture, The Obsidian Penthouse redefined luxury living in the heart of the Metropolitan District. Spanning the entire 54th floor, this 4,200 square-foot residence offers 360-degree panoramic views of the skyline and the coastline beyond.',
        description2: 'Designed by world-renowned architect Adrian Vossen, the space features bespoke materials including hand-picked Noir Marquina marble, wire-brushed white oak flooring, and custom brass fixtures throughout. The centerpiece is a 20-foot sculptural fireplace that anchors the primary living salon.',
        beds: 4,
        baths: 4.5,
        sqft: '4,200',
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCATuFY8w4z06geRlBtdyepBAAtbFKSoyJ9utNvzxLWI_z-kHsNP7m_earCH-TBndEoT6DRfkGLaEYqahjNoS5ON926GebZqlkqOfsctnOpyaJqXahIdFguQJwugs1_kHZchvFB0Ia7jDmtDIipFaKbW2BHnPut4URQw_iLaqyB0GLAAMzszB3J0aACq389nq34yVbFVceOFhxRaUXxXMtiat0dx2bEElfFol0p0pJjAza43Kt3QnaoZbkLnUhs1sxIAKr-1Ca8Pr8Z',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD4vV39LEW2L2TZSOPVhKRBavfanMzwmBEQXEvUOTDSK7HbMVxbOrFQkfZ-y0dGggYLxH4qyRCXLa7ko0-PNZyar4AsAIR3n-jt0-zDfIcXZkfRsvGR0K8BDPgZSzViVgyfwKo-ojIcXcfmigAsggs172jlsb6jZ_wLGOePV3AsLnLdO_Sn9q8MXc7B3ce9N1ca16j1ti_AqlgZIwhiKq9e68fsMPgsxpJKgviua04VEOQ7K2_29X1tmoEwMOFb-1_5utFIOZ97Q74D',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuARUuTY8kQ1ayBii6wyz19ySKPpm45QyqZMFmMvKEjup3Y3Kmu5fcGFDCoZcRoya3tn-NB4B8dCAI2DZmDTwf2kRfV6dtZHYMaIxd-3Ha9ffC-xQVSJu-3Q8EzOe6KXEj9pqwqCfivlCiaLnVfvF0krxn-nyYLzyC1kyzPqzHx7IYqUWDsHWSSy6HSsdBZxRY8nb1e-XvNzbYBEO0QnWPa51wKGSZGKm270R9hQNLePa7m8IhlMPBCiD9Zz9wmTk_LwG21LTUqrgsfH'
        ]
    };

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8 pt-24 min-h-screen">
                <PropertyGallery images={property.images} />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative">
                    <PropertyDetails property={property} />

                    <div className="col-span-1 md:col-span-4">
                        <AgentSidebar />
                    </div>
                </div>

                <SimilarProperties />
            </main>

            <Footer />
        </>
    );
};

export default PropertyPage;
