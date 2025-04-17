"use client";

import Image from "next/image";
import { useHover } from "../context/HoverContext";

export const LeftButton = () => {
  const { hoveredElement, setHoveredElement } = useHover();

  return (
    <div
      className={`w-full h-full relative transition-opacity duration-500 ${
        hoveredElement === "rectangle-l-right" ? "sm:opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full h-full flex justify-start items-center">
        <div className="relative">
          <Image
            src="/Rectangle-L.png"
            alt="Rectangle-Large"
            width={200}
            height={200}
            className="rotate-180 w-[150px] md:w-[180px] lg:w-[200px] h-auto z-20 relative"
          />
          <Image
            src="/Rectangle-XL.png"
            alt="Rectangle-XLarge"
            width={300}
            height={300}
            className={`rotate-180 absolute top-[50%] left-[70%] -translate-x-1/2 -translate-y-[50%] w-[200px] h-auto transition-all duration-500 ease-in-out z-10 scale-[1.3] hidden sm:block ${
              hoveredElement === "rectangle-l-left" ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/Rectangle-2XL.png"
            alt="Rectangle-2XLarge"
            width={400}
            height={400}
            className={`rotate-180 absolute top-[50%] left-[75%] -translate-x-1/2 -translate-y-[50%] w-[200px] h-auto transition-all duration-500 ease-in-out z-0 scale-[1.9] hidden sm:block ${
              hoveredElement === "rectangle-l-left" ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex justify-center gap-2 md:gap-4 cursor-not-allowed z-50"
            onMouseEnter={() => setHoveredElement("rectangle-l-left")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className="flex-shrink-0 h-[48px] w-[48px] relative">
              <Image
                src="/button-icon-sm.png"
                alt="small button"
                width={36}
                height={36}
                className="rotate-180 w-full h-full transition-all duration-500 ease-in-out"
              />
              <Image
                src="/button-icon-dashed.png"
                alt="dashed button border"
                width={44}
                height={44}
                className="absolute left-[50%] -translate-x-[50%] top-1 w-[40px] h-[40px] opacity-0 transition-all duration-500 ease-in-out"
              />
            </div>
            <p className="text-[10px] md:text-[12px] font-semibold transition-all duration-500 ease-in-out whitespace-nowrap self-center">
              DISCOVER A.I.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
