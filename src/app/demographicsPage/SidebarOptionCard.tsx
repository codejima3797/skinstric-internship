import Image from "next/image";
import React from "react";

interface SidebarOptionCardProps {
  label: string;
  selectedLabel?: string | null;
  isSelected: boolean;
  onClick: () => void;
  imageSrc: string;
  imageAlt: string;
}

const SidebarOptionCard: React.FC<SidebarOptionCardProps> = ({
  label,
  selectedLabel,
  isSelected,
  onClick,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div
      className="w-full 2xl:h-[90px] xl:h-[90px] lg:h-[90px] md:h-[90px] sm:h-[90px] h-[70px] relative cursor-pointer group border-t-2 border-black"
      onClick={onClick}
    >
      <div
        className={`w-full h-full transition-opacity duration-300 ease-in-out ${
          isSelected ? "opacity-100" : "opacity-5 group-hover:opacity-15"
        }`}
      >
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={180} 
          height={180}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-around pl-2 text-[14px] font-semibold">
        <p
          className={`transition-colors duration-300 ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          {selectedLabel ? selectedLabel.toUpperCase() : ""}
        </p>
        <p
          className={`transition-colors duration-300 ${
            isSelected ? "text-white" : "text-black"
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

export default SidebarOptionCard; 