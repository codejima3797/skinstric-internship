"use client";

import { useState } from "react";

interface InputSectionProps {
  placeholder: string;
  headerText: string;
  onValueChange: (value: string) => void;
  value: string;
}

export const InputSection = ({
  placeholder,
  headerText,
  onValueChange,
  value,
}: InputSectionProps) => {
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [inputHeader, setInputHeader] = useState("CLICK TO TYPE");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const capitalized = value.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    onValueChange(capitalized);
  };

  return (
    <>
      <h4 className="opacity-40 text-[14px] cursor-default">
        {inputHeader}
      </h4>
      <input
        className="text-[48px] leading-[48px] tracking-[-7%] text-center underline decoration-2 underline-offset-6 focus:outline-none placeholder-[#1a1b1c] pt-4 mb-32 z-2"
        type="text"
        placeholder={localPlaceholder}
        value={value}
        onChange={handleChange}
        onFocus={() => {
          setLocalPlaceholder("");
          setInputHeader(headerText);
        }}
        onBlur={() => {
          setLocalPlaceholder(placeholder);
          setInputHeader("CLICK TO TYPE");
        }}
      />
    </>
  );
}; 