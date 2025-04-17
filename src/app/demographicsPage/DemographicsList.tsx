import Image from "next/image";
import React from "react";

interface ListItem {
  label: string;
  confidence: string;
  isSelected?: boolean;
}

interface DemographicsListProps {
  items: ListItem[];
  selectedOption: string;
  onSelect: (label: string) => void;
  formatLabel?: (label: string) => string;
}

const DemographicsList: React.FC<DemographicsListProps> = ({
  items,
  selectedOption,
  onSelect,
  formatLabel = (label) => label,
}) => {
  return (
    <div className="h-full relative">
      <Image
        src="/demographics-list.png"
        alt="demographics list"
        width={350}
        height={250}
        className="w-full h-full border-t-2 border-black"
      />
      <div className="absolute inset-0 xl:text-[16px] lg:text-[16px] md:text-[16px] sm:text-[14px] text-[12px] leading-3.5">
        <div className="w-full h-[30px] flex justify-between items-center px-3 opacity-80">
          <div className="flex items-center gap-2">
            {selectedOption.toUpperCase()}
          </div>
          <div>A.I. Confidence %</div>
        </div>
        <div className="w-full 2xl:flex xl:flex lg:flex md:flex sm:grid grid flex-col sm:grid-cols-3 grid-cols-3 gap-3 pt-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`h-[30px] flex justify-between items-center relative cursor-pointer px-2 ${
                item.isSelected ? "bg-black text-white" : ""
              }`}
              onClick={() => onSelect(item.label)}
            >
              <div className="flex items-center gap-2">
                <div className="min-w-[14px] min-h-[14px] w-[14px] h-[14px] relative">
                  <Image
                    src="/outer-diamond-race.png"
                    alt="outer diamond"
                    width={14}
                    height={14}
                    className={`w-[14px] h-[14px] ${item.isSelected ? "" : "invert"}`}
                  />
                  <Image
                    src="/inner-diamond-race.png"
                    alt="inner diamond"
                    width={7}
                    height={7}
                    className="absolute top-[26%] left-[26%]"
                  />
                </div>
                {formatLabel(item.label)}
              </div>
              <div>{item.confidence}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemographicsList; 