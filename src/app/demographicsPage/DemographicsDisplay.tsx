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
      className="w-full xl:h-[450px] lg:h-[450px] md:h-[450px] sm:h-[200px] h-[200px] border-t-2 border-black"
    />
    <p className="absolute top-[3%] left-[2%] text-[24px]">
      {selectedOptionText}
    </p>
    <div className="absolute xl:bottom-[3%] xl:right-[1%] lg:bottom-[3%] lg:right-[1%] md:bottom-[3%] md:right-[3%] sm:bottom-0 sm:right-[1%] bottom-[1%] right-[1%]">
      <CircularProgress
        percentage={confidence}
        isVisible={isVisible}
        className="xl:w-[300px] xl:h-[300px] lg:w-[300px] lg:h-[300px] md:w-[200px] md:h-[200px] sm:w-[200px] sm:h-[200px] w-[200px] h-[200px]"
      />
    </div>
  </div>
);

export default DemographicsDisplay; 