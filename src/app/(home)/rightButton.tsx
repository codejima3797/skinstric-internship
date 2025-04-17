"use client";

import Image from "next/image";
import { useHover } from "../context/HoverContext";
import { useRouter } from "next/navigation";

export const RightButton = () => {
  const { hoveredElement, setHoveredElement } = useHover();
  const router = useRouter();

  return (
    <div
      className={`w-full h-full relative transition-opacity duration-500 ${
        hoveredElement === "rectangle-l-left" ? "sm:opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full h-full flex justify-end items-center">
        <div className="relative">
          <Image
            src="/Rectangle-L.png"
            alt="Rectangle-Large"
            width={200}
            height={200}
            className="w-[150px] md:w-[180px] lg:w-[200px] h-auto z-20 relative"
          />
          <Image
            src="/Rectangle-XL.png"
            alt="Rectangle-XLarge"
            width={300}
            height={300}
            className={`absolute top-[50%] left-[35%] -translate-x-1/2 -translate-y-[50%] w-[200px] h-auto transition-all duration-500 ease-in-out z-10 scale-[1.3] hidden sm:block ${
              hoveredElement === "rectangle-l-right" ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/Rectangle-2XL.png"
            alt="Rectangle-2XLarge"
            width={400}
            height={400}
            className={`absolute top-[50%] left-[35%] -translate-x-1/2 -translate-y-[50%] w-[200px] h-auto transition-all duration-500 ease-in-out z-0 scale-[1.9] hidden sm:block ${
              hoveredElement === "rectangle-l-right" ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex justify-center gap-2 md:gap-4 cursor-pointer group z-50"
            onClick={() => router.push("/introPage")}
            onMouseEnter={() => setHoveredElement("rectangle-l-right")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <p className="text-[10px] md:text-[12px] font-semibold group-hover:pr-2 transition-all duration-500 ease-in-out whitespace-nowrap self-center">
              TAKE TEST
            </p>
            <div className="flex-shrink-0 h-[48px] w-[48px] relative">
              <Image
                src="/button-icon-sm.png"
                alt="small button"
                width={36}
                height={36}
                className="w-full h-full group-hover:scale-120 transition-all duration-500 ease-in-out"
              />
              <Image
                src="/button-icon-dashed.png"
                alt="dashed button border"
                width={44}
                height={44}
                className="absolute right-[50%] translate-x-[50%] top-1 w-[40px] h-[40px] opacity-0 group-hover:opacity-100 z-50 hover:cursor-pointer transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
