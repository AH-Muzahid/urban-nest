'use client';

import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const SimilarProperties = () => {
    const similarProps = [
        {
            id: 1,
            title: 'The Serenity Villa',
            location: 'Azure Heights, Coastal District',
            price: '$3,150,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfrCkZqzng75mGPe7X0BbqhZu5mUIAawmcKOJmBLcRidyOtE8A1VZOCYR4YsCf1uHB8P1oi0TNJt3lnLj0_uLR3X7qnIWHS8H-xNT6IS6HEYZrSDv6Op0FbjYi79Vqgk2ZrAtDhSX_7swzpFhJwbtXLw2OxD5KILdisVSQutcVGwYkimzi3WwNL7jWz_CXfYKuPHCIq4mzlQFlabFK8_2jMvJ3Nwx_0c2AzMJvmqHT5G0pJ8PxIYNUon9H0ORuBH1WP511UDWWS9uB',
            badge: 'Available',
            badgeColor: 'bg-white/90 text-black',
        },
        {
            id: 2,
            title: 'The Ironworks Loft',
            location: 'Warehouse Square, Downtown',
            price: '$1,850,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeNDWtAZZVwhVmJ-KJlZSDW0gcBmu0v098J4PBt_q1lZBrltkEzN2HiksQl5Y67pf4ywgSvIPqkG777WCSQ_yB5lSs88SE-eQ_7IyWSjslYW_t5ct1CO6bKrq3daHqQSc5wHkH_M8QpXAvzURg969D67k2SVQxMBTr_zADbZb3G67HoHlaqRp4b5TjFY-prMASo_vWCCja46XlyJflXP6RyypG6SWMxKFLE7-wAPvsDSYmSnBVKAavdo6H-bTP-q7-kn3wKs__Qvn2',
        },
        {
            id: 3,
            title: 'Emerald Gardens Estate',
            location: 'Greenwich Village North',
            price: '$6,400,000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8hsyumFyuy_ZI9b7QO5UeVn6FMcgQS41LRxcOB_nzihT4RcXjHdC3djtBEw-bide1SwUNGGaCX9xf8MVuCp1gSr3tq6kp-yi3O8GUMPzMzknoL5WuguKnurzuvk1JKgdCZ1kjP96GwVh_AilVq30I7d8-7ZlTRvGygTAFJRwPAf7DSd4-7HVpWOBrDua7hzHxiJVNF0fffpgHLO7k8ivl42MFSZFRH337pOhLGjtyLSMv2CnkRowiRXyo2hm39oHCWNNs47moAUNl',
            badge: 'New Listing',
            badgeColor: 'bg-primary text-background-dark',
        },
    ];

    return (
        <section className="mt-32 mb-20">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-black mb-2 tracking-tight">More from the Collection</h2>
                    <p className="text-gray-500 font-medium">Curated high-end residences matching your taste</p>
                </div>
                <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <MdChevronLeft className="text-2xl" />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-primary">
                        <MdChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similarProps.map((prop) => (
                    <div key={prop.id} className="group cursor-pointer">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-5">
                            <div
                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                style={{ backgroundImage: `url('${prop.image}')` }}
                            />
                            {prop.badge && (
                                <div className={`absolute top-4 right-4 ${prop.badgeColor} backdrop-blur px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest`}>
                                    {prop.badge}
                                </div>
                            )}
                        </div>
                        <h4 className="font-black text-xl mb-1 group-hover:text-primary transition-colors">{prop.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{prop.location}</p>
                        <p className="text-primary font-black text-lg">{prop.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SimilarProperties;
