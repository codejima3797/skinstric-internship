import Image from "next/image";

interface NavigationButtonsProps {
  onBack?: () => void;
  onProceed: () => void;
  proceedDisabled?: boolean;
}

export const NavigationButtons = ({ onBack, onProceed, proceedDisabled = false }: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between w-full mt-8">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Image src="/back-arrow.svg" alt="back" width={24} height={24} />
          <span>Back</span>
        </button>
      )}
      <button
        onClick={onProceed}
        disabled={proceedDisabled}
        className={`ml-auto px-6 py-2 rounded-full ${
          proceedDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white transition-colors`}
      >
        Proceed
      </button>
    </div>
  );
}; 