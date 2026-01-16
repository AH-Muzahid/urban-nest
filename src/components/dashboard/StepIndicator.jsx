'use client';

const StepIndicator = ({ currentStep, totalSteps }) => {
    const steps = [
        { id: 1, label: 'Basic Info' },
        { id: 2, label: 'Location' },
        { id: 3, label: 'Media' },
        { id: 4, label: 'Amenities' },
    ];

    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="mb-14 px-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-100 dark:border-gray-800 pb-1 gap-4">
                <div className="flex gap-6 md:gap-10 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {steps.map((step) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <div
                                key={step.id}
                                className={`flex flex-col gap-2 pb-3 ${isActive ? 'border-b-2 border-[#d4af37] -mb-0.5' : 'opacity-40'}`}
                            >
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-[#d4af37]' : ''}`}>
                                    Step {step.id}
                                </span>
                                <span className={`text-base font-bold ${isActive ? 'text-black dark:text-white' : ''}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className="text-right pb-3">
                    <span className="text-sm font-bold text-[#d4af37]">{progress}% Complete</span>
                    <div className="w-48 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-2 overflow-hidden">
                        <div
                            className="bg-[#d4af37] h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepIndicator;
