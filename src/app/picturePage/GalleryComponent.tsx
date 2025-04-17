"use client";

import Image from "next/image";
import React from "react";
import { PictureSquares } from "./PictureSquares";

interface GalleryComponentProps {
  onUploadSuccess: (imageBase64: string) => void;
  onUploadError: (error: Error) => void;
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({
  onUploadSuccess,
  onUploadError,
}) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        const base64Data = base64String.split(',')[1] || base64String;
        onUploadSuccess(base64Data);
      };
      reader.onerror = () => {
        onUploadError(new Error("Failed to read file"));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      onUploadError(error as Error);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute 2xl:top-[45%] xl:top-[45%] 2xl:right-[30%] xl:right-[30%] lg:top-[45%] lg:right-[25%] md:top-[45%] md:right-[10%] sm:top-[45%] sm:right-[5%] top-[45%] -right-[35%]">
        <div className="relative">
          <div className="2xl:w-[400px] 2xl:h-[400px] xl:w-[400px] xl:h-[400px] lg:w-[400px] lg:h-[400px] md:w-[350px] md:h-[350px] sm:w-[350px] sm:h-[350px] w-[350px] h-[350px]">
            <PictureSquares size="small" />
          </div>
          <div className="w-50 h-50 absolute -top-[13%] -left-[1%] 2xl:-top-[12%] 2xl:-left-[2%] xl:-top-[12%] xl:-left-[2%] lg:-top-[12%] lg:-left-[2%] md:-top-[13%] md:-left-[1%] sm:-top-[13%] sm:-left-[1%]">
            <div className="w-full h-full relative">
              <label htmlFor="file-input" className="cursor-pointer">
                <Image
                  src="/gallery-icon.png"
                  alt="gallery icon"
                  width={100}
                  height={100}
                  className="absolute 2xl:left-[79%] xl:left-[79%] lg:left-[79%] md:left-[68%] sm:left-[68%] left-[74%] 2xl:top-0 xl:top-0 lg:top-0 md:top-[4%] sm:top-[4%] top-[7%] peer hover:scale-110 transition-all duration-700 ease-in-out z-2 2xl:w-[100px] xl:w-[100px] lg:w-[100px] md:w-[80px] sm:w-[80px] w-[60px]"
                  style={{ height: "auto" }}
                />
              </label>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <Image
            src="/ai-gallery-text.png"
            alt="gallery text"
            width={200}
            height={200}
            className="absolute 2xl:top-[6%] xl:top-[6%] lg:top-[6%] md:top-[6%] sm:top-[6%] top-[4%] 2xl:-left-[8%] xl:-left-[8%] lg:-left-[8%] md:-left-[1%] sm:-left-[1%] left-[7.5%] 2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-[150px] sm:w-[150px] w-[130px]"
            style={{ height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;