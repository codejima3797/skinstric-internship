"use client";

import Image from "next/image";

interface AnalysisDiamondProps {
  title: string;
  top: string;
  left: string;
  isClickable?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const AnalysisDiamond = ({
  title,
  top,
  left,
  isClickable = false,
  isSelected = false,
  onClick,
}: AnalysisDiamondProps) => {
  const renderTitle = () => {
    if (title === "SKIN TYPE DETAILS") {
      return (
        <div className="flex flex-col items-center">
          <p className="xl:text-[12px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-semibold text-center">SKIN TYPE</p>
          <p className="xl:text-[12px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-semibold text-center">DETAILS</p>
        </div>
      );
    }
    if (title === "COSMETIC CONCERNS") {
      return (
        <div className="flex flex-col items-center">
          <p className="xl:text-[12px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-semibold text-center">COSMETIC</p>
          <p className="xl:text-[12px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-semibold text-center">CONCERNS</p>
        </div>
      );
    }
    return <p className="xl:text-[12px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[10px] font-semibold text-center">{title}</p>;
  };

  return (
    <div
      className={`xl:w-[150px] xl:h-[150px] lg:w-[150px] lg:h-[150px] md:w-[150px] md:h-[150px] sm:w-[100px] sm:h-[100px] w-[100px] h-[100px] absolute ${top} ${left} mobile:left-[${parseInt(left.split('[')[1].split('%]')[0]) - 5}%] ${isClickable ? 'cursor-pointer z-20' : 'hover:cursor-not-allowed z-10'}`}
      style={{
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
      }}
      onClick={onClick}
    >
      <div className="w-full h-full rotate-45">
        <Image
          src="/analysis-square.png"
          alt="analysis square"
          width={150}
          height={150}
          className={`transition-opacity duration-300 -rotate-45 absolute top-0 left-0 ${
            isSelected ? "opacity-100" : "opacity-60"
          }`}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 w-full">
          {renderTitle()}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDiamond; 