"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { useRouter } from "next/navigation";
import CameraComponent from "./CameraComponent";
import GalleryComponent from "./GalleryComponent";
import { analyzeImage } from "../utils/api";
import { PageHeader } from "../components/PageHeader";

const PicturePage = () => {
  const router = useRouter();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [uploadedImageData, setUploadedImageData] = useState<string | null>(null);

  const handleUploadSuccess = async (imageBase64: string) => {
    try {
      setUploadedImageData(imageBase64);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("An error occurred while processing the image.");
    }
  };

  const handleUploadError = (error: Error) => {
    alert("An error occurred while uploading the image.");
    console.error("Error uploading image:", error);
  };

  const handleProceed = async () => {
    if (uploadedImageData) {
      try {
        const response = await analyzeImage(uploadedImageData);
        localStorage.setItem('demographicsData', JSON.stringify(response.data));
        router.push("/analysisPage");
      } catch (error) {
        console.error("Error processing image:", error);
        alert("An error occurred while processing the image.");
      }
    }
  };

  const handleCapture = async (imageData: string) => {
    try {
      const response = await analyzeImage(imageData);
      localStorage.setItem('demographicsData', JSON.stringify(response.data));
      router.push("/analysisPage");
    } catch (error) {
      console.error("Error processing captured image:", error);
      alert("An error occurred while processing the image.");
    }
  };

  const handleCameraActive = () => {
    setIsCameraActive(true);
  };

  const handleStreamChange = (newStream: MediaStream | null) => {
    setStream(newStream);
  };

  const handleExitFullscreen = () => {
    setIsCameraActive(false);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="relative z-50">
        <Navbar variant="intro" isInverted={isCameraActive} />
      </div>
      {!isCameraActive ? (
        <div className="w-full h-full">
          <PageHeader />
          <div className="w-full h-full xl:flex lg:flex md:flex sm:flex flex xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col justify-center items-center">
            <div className="w-[50%] h-full flex items-center justify-center relative">
              <CameraComponent 
                onCapture={handleCapture} 
                onCameraActive={handleCameraActive}
                isFullScreen={false}
                initialStream={stream}
                onStreamChange={handleStreamChange}
              />
            </div>
            <div className="w-[50%] h-full flex items-center justify-center relative">
              <GalleryComponent
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                onProceed={handleProceed}
              />
            </div>
          </div>
          <div
            className="absolute left-[2%] xl:bottom-[4%] lg:bottom-[4%] md:bottom-[4%] sm:bottom-[4%] bottom-[8.5%] hover:cursor-pointer"
            onClick={() => router.push("/locationPage")}
          >
            <Image
              src="/button-icon-text-back.png"
              alt="back button"
              width={100}
              height={100}
              style={{ height: "auto" }}
            />
          </div>
        </div>
      ) : (
        <CameraComponent 
          onCapture={handleCapture} 
          onCameraActive={handleCameraActive}
          isFullScreen={true}
          initialStream={stream}
          onStreamChange={handleStreamChange}
          onExitFullscreen={handleExitFullscreen}
        />
      )}
    </div>
  );
};

export default PicturePage;
