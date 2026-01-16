'use client';

import { MdKeyboardArrowDown } from 'react-icons/md';

const FormSelect = ({ label, options, value, onChange, className }) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {label && <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>}
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-6 py-4 text-base focus:ring-2 focus:ring-[#d4af37]/50 appearance-none outline-none cursor-pointer"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl" />
            </div>
        </div>
    );
};

export default FormSelect;
