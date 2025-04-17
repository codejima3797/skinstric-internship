"use client";

import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RotatingSquares } from "../components/RotatingSquares";
import { isValidCapitalizedWords } from "@/utils/validation";

const IntroPage = () => {
  const [placeholder, setPlaceholder] = useState("Introduce Yourself");
  const [inputValue, setInputValue] = useState("");
  const [inputHeader, setInputHeader] = useState("CLICK TO TYPE");
  const router = useRouter();

  const isValidInput = (text: string) => {
    // Check if it's only letters and spaces, and properly capitalized
    return /^[A-Za-z\s]+$/.test(text) && isValidCapitalizedWords(text);
  };

  const handleProceed = () => {
    if (isValidInput(inputValue)) {
      localStorage.setItem('userName', inputValue);
      router.push("/locationPage");
    } else {
      alert("Please enter a valid name with proper capitalization (e.g., 'John Smith').");
    }
  };

  return (
    <div className="w-full h-dvh overflow-hidden">
      <Navbar variant="intro" />
      <header>
        <div className="w-[227px] h-[24px] text-[14px] font-[600] leading-[24px] absolute top-[8%] sm:top-[64px] left-[5%] sm:left-[24px]">
          TO START ANALYSIS
        </div>
      </header>
      <div className="w-full h-full font-normal flex flex-col items-center justify-center relative">
        <div className="w-full h-full absolute inset-0">
          <div className="w-[750px] h-[750px] sm:w-[800px] sm:h-[800px] md:w-[850px] md:h-[850px] lg:w-[900px] lg:h-[900px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[65%]">
            <RotatingSquares isIntroOrLocation={true} />
          </div>
        </div>
        <h4 className="opacity-40 text-[12px] sm:text-[14px] cursor-default relative z-10">
          {inputHeader}
        </h4>
        <input
          className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] lg:text-5xl lg:leading-[1.2] md:text-4xl md:leading-[1.2] sm:text-3xl sm:leading-[1.2] text-2xl leading-[1.2] tracking-[-0.02em] text-center underline decoration-2 underline-offset-4 focus:outline-none placeholder-[#1a1b1c] pt-4 mb-32 z-10 relative"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;

            const capitalized = value.split(' ').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
            setInputValue(capitalized);
          }}
          onFocus={() => {
            setPlaceholder("");
            setInputHeader("INTRODUCE YOURSELF");
          }}
          onBlur={() => {
            setPlaceholder("Introduce Yourself");
            setInputHeader("CLICK TO TYPE");
          }}
        />
        <div
          className="absolute left-[2%] bottom-[4%] hover:cursor-pointer w-[80px] sm:w-[100px] h-auto"
          onClick={() => router.push("/")}
        >
          <Image
            src="/button-icon-text-back.png"
            alt="back button"
            width={100}
            height={100}
            className="w-full h-auto"
          />
        </div>
        {inputValue.trim() && (
          <div
            className="absolute right-[2%] bottom-[4%] hover:cursor-pointer w-[100px] sm:w-[127px] h-auto"
            onClick={handleProceed}
          >
            <Image
              src="/button-icon-text-proceed.png"
              alt="proceed button"
              width={127}
              height={127}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroPage;
