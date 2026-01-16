'use client';

const FormInput = ({ label, type = 'text', placeholder, value, onChange, prefix, className }) => {
    return (
        <div className={`space-y-3 ${className}`}>
            {label && <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>}
            <div className="relative">
                {prefix && (
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                        {prefix}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-6 py-4 text-base focus:ring-2 focus:ring-[#d4af37]/50 placeholder:text-gray-300 dark:placeholder:text-gray-600 outline-none transition-all ${prefix ? 'pl-12' : ''}`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default FormInput;
