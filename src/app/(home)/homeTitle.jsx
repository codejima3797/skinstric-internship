'use client';

import { useHover } from "../context/HoverContext";
import { useEffect } from "react";

export const HomeTitle = () => {
  const { hoveredElement, setHoveredElement } = useHover();

  useEffect(() => {
    setHoveredElement(null);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light">
      <h1 className={`transition-all duration-700 ease-in-out text-center ${
        hoveredElement === 'rectangle-l-right' ? 'sm:-translate-x-[66%]' : 
        hoveredElement === 'rectangle-l-left' ? 'sm:translate-x-[66%]' : ''
      }`}>Sophisticated</h1>
      <h1 className={`transition-all duration-700 ease-in-out text-center ${
        hoveredElement === 'rectangle-l-right' ? 'sm:-translate-x-[135%]' : 
        hoveredElement === 'rectangle-l-left' ? 'sm:translate-x-[135%]' : ''
      }`}>skincare</h1>
    </div>
  );
};
