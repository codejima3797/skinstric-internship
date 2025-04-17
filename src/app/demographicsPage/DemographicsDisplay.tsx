import Image from "next/image";
import CircularProgress from "./CircularProgress";
import React from "react";

interface DemographicsDisplayProps {
  selectedOptionText: string;
  confidence: number;
  isVisible: boolean;
}

const DemographicsDisplay: React.FC<DemographicsDisplayProps> = ({
  selectedOptionText,
  confidence,
  isVisible,
}) => (
  <div className="relative">
    <Image
      src="/demographics-display.png"
      alt="demographics display"
      width={900}
      height={500}
      className="w-full 2xl:h-[450px] xl:h-[450px] lg:h-[450px] md:h-[450px] sm:h-[200px] h-[160px] border-t-2 border-black"
    />
    <p className="absolute top-[3%] left-[2%] text-[24px]">
      {selectedOptionText}
    </p>
    <div className="absolute 2xl:bottom-[3%] 2xl:right-[1%] xl:bottom-[3%] xl:right-[1%] lg:bottom-[3%] lg:right-[1%] md:bottom-[3%] md:right-[3%] sm:bottom-0 sm:right-[1%] bottom-[1%] right-[1%]">
      <CircularProgress
        percentage={confidence}
        isVisible={isVisible}
        className="2xl:w-[300px] 2xl:h-[300px] xl:w-[300px] xl:h-[300px] lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] sm:w-[200px] sm:h-[200px] w-[160px] h-[160px]"
      />
    </div>
  </div>
);

export default DemographicsDisplay; 