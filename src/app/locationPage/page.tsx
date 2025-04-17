"use client";

import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RotatingSquares } from "../components/RotatingSquares";
import { submitUserInfo } from "@/utils/api";
import { isValidCapitalizedWords } from "@/utils/validation";

const LocationPage = () => {
  const [placeholder, setPlaceholder] = useState("Where are you from?");
  const [inputValue, setInputValue] = useState("");
  const [inputHeader, setInputHeader] = useState("CLICK TO TYPE");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      router.push('/introPage');
    }
  }, [router]);

  const isValidInput = (text: string) => {
    return /^[A-Za-z\s,]+$/.test(text) && isValidCapitalizedWords(text);
  };

  const handleProceed = async () => {
    if (isValidInput(inputValue)) {
      try {
        const userName = localStorage.getItem('userName');
        if (!userName) {
          throw new Error('No name found');
        }
        
        await submitUserInfo(userName, inputValue);
        setSuccessMessage(`Success! Added ${userName} from ${inputValue}`);
        
        setTimeout(() => {
          router.push("/picturePage");
        }, 2000);
      } catch (error) {
        console.error('Error submitting user info:', error);
        alert("Failed to submit information. Please try again.");
      }
    } else {
      alert("Please enter a valid location with proper capitalization (e.g., 'New York').");
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
          className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] lg:text-[45px] lg:leading-[1.2] md:text-4xl md:leading-[1.2] sm:text-3xl sm:leading-[1.2] text-2xl leading-[1.2] tracking-[-0.02em] text-center underline decoration-2 underline-offset-4 focus:outline-none placeholder-[#1a1b1c] pt-4 mb-32 z-10 relative"
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
            setInputHeader("WHERE ARE YOU FROM?");
          }}
          onBlur={() => {
            setPlaceholder("Where are you from?");
            setInputHeader("CLICK TO TYPE");
          }}
        />
        {successMessage && (
          <div className="text-black xl:text-4xl lg:text-3xl md:text-xl sm:text-xl text-xl absolute right-[3%] bottom-[20%]">
            {successMessage}
          </div>
        )}
        <div
          className="absolute left-[2%] bottom-[5%] sm:bottom-[10%] hover:cursor-pointer w-[80px] sm:w-[100px] h-auto"
          onClick={() => router.push("/introPage")}
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
            className="absolute right-[2%] bottom-[5%] sm:bottom-[10%] hover:cursor-pointer w-[100px] sm:w-[127px] h-auto"
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

export default LocationPage;
