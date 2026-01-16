'use client';

const CounterInput = ({ label, value, onChange, className }) => {
    const handleDecrement = () => {
        if (value > 0) onChange(value - 0.5); // Supporting half baths
    };

    const handleIncrement = () => {
        onChange(value + 0.5);
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {label && <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2">
                <button
                    onClick={handleDecrement}
                    className="size-10 flex items-center justify-center text-gray-400 hover:text-[#d4af37] text-xl font-light hover:bg-white dark:hover:bg-black rounded-lg transition-all"
                    type="button"
                >
                    -
                </button>
                <span className="font-bold text-lg">{value}</span>
                <button
                    onClick={handleIncrement}
                    className="size-10 flex items-center justify-center text-gray-400 hover:text-[#d4af37] text-xl font-light hover:bg-white dark:hover:bg-black rounded-lg transition-all"
                    type="button"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CounterInput;
