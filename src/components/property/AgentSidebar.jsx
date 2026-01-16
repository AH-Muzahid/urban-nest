'use client';

import { MdCalendarToday, MdFavorite, MdShare } from 'react-icons/md';

const AgentSidebar = () => {
    return (
        <div className="sticky top-[100px] flex flex-col gap-6">
            {/* Agent Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-8">
                    <div
                        className="w-16 h-16 rounded-2xl bg-cover bg-center"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDB3eq9TogcTAGh4H1AkFsL_nY-abJDp71wTiUA4apdu3VBebXjapsCeusC02FR3427k34rdzz5EcgP4gbCpvLIbK317euVr2aJUD3vowbkeEeQaur7iuTxvL_esxP3EswvZRpH9F6f-HFOQarv2RRIDEO1H9aQHu1kxAGxuYoAvA_E88NqBr1I0jYSzX8oz2mNo2uNJePhTs22GOLGngVC4nnxievKfugBXJFFb1aA9K_amKDNBGQRKCmIPS9KJ0hiiRPrOEA3zb_l")' }}
                    />
                    <div>
                        <h4 className="font-black text-lg">Sarah Jenkins</h4>
                        <p className="text-gray-400 text-sm">Premier Luxury Specialist</p>
                    </div>
                </div>

                <form className="space-y-4 mb-6">
                    <input
                        className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Your Name"
                        type="text"
                    />
                    <input
                        className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                        placeholder="Your Email"
                        type="email"
                    />
                    <textarea
                        className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                        placeholder="I'm interested in the Obsidian Penthouse..."
                        rows="3"
                    ></textarea>
                </form>

                <div className="flex flex-col gap-3">
                    <button className="w-full bg-primary text-background-dark font-black py-4 rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                        <MdCalendarToday className="text-xl" />
                        Schedule Viewing
                    </button>
                    <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Message Agent
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-6">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-bold">
                        <MdFavorite className="text-lg" /> Save
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-bold">
                        <MdShare className="text-lg" /> Share
                    </button>
                </div>
            </div>

            {/* Market Insights Mini Card */}
            <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary font-bold text-lg">↗</span>
                    <h5 className="font-bold text-sm">Market Trend</h5>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                    Property values in Metropolitan District have increased by 8.4% in the last 12 months.
                </p>
            </div>
        </div>
    );
};

export default AgentSidebar;
