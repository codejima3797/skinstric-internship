"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { useRouter } from "next/navigation";
import AnalysisHeader from "./AnalysisHeader";
import AnalysisSquares from "./AnalysisSquares";
import AnalysisDiamond from "./AnalysisDiamond";

const AnalysisPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDemographicsSelected, setIsDemographicsSelected] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="2xl:w-[600px] xl:w-[600px] lg:w-[600px] md:w-[600px] sm:w-[600px] w-[400px] 2xl:h-[600px] xl:h-[600px] lg:h-[600px] md:h-[600px] sm:h-[600px] h-[400px] relative">
            <Image
              src="/analysis-loading.png"
              alt="large square"
              width={600}
              height={600}
              className="absolute animate-pulse 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full w-full top-0 left-0"
            />
            <Image
              src="/analysis-loading-text.png"
              alt="preparing your analysis..."
              width={200}
              height={200}
              className="absolute 2xl:top-[48%] xl:top-[48%] lg:top-[48%] md:top-[48%] sm:top-[48%] top-[48%] 2xl:left-[34%] xl:left-[34%] lg:left-[34%] md:left-[34%] sm:left-[34%] left-[30%] 2xl:w-[200px] xl:w-[200px] lg:w-[200px] md:w-[200px] sm:w-[200px] w-[160px]"
            />
          </div>
        </div>
      ) : (
        <>
          <Navbar variant="analysis" />
          <AnalysisHeader />
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-[600px] h-[600px] absolute flex justify-center items-center 2xl:ml-0 xl:ml-0 lg:ml-0 md:ml-0 sm:ml-0 ml-9">
              <AnalysisSquares />
              <div className="2xl:w-[350px] 2xl:h-[350px] xl:w-[350px] xl:h-[350px] lg:w-[350px] lg:h-[350px] md:w-[350px] md:h-[350px] sm:w-[250px] sm:h-[250px] w-[250px] h-[250px] absolute 2xl:top-[21%] 2xl:left-[22.5%] xl:top-[21%] xl:left-[22.5%] lg:top-[21%] lg:left-[22.5%] md:top-[21%] md:left-[22.5%] sm:top-[31.5%] sm:left-[23.5%] top-[31.5%] left-[28%]">
                <AnalysisDiamond
                  title="DEMOGRAPHICS"
                  top="top-[4%]"
                  left="left-[25%]"
                  isClickable
                  isSelected={isDemographicsSelected}
                  onClick={() =>
                    setIsDemographicsSelected(!isDemographicsSelected)
                  }
                />
                <AnalysisDiamond
                  title="SKIN TYPE DETAILS"
                  top="top-[27%]"
                  left="left-[2%]"
                />
                <AnalysisDiamond
                  title="WEATHER"
                  top="top-[50%]"
                  left="left-[25%]"
                />
                <AnalysisDiamond
                  title="COSMETIC CONCERNS"
                  top="top-[27%]"
                  left="left-[48%]"
                />
              </div>
            </div>
          </div>
          <Image
            src="/button-icon-text-back-b.png"
            alt="back button"
            width={100}
            height={100}
            className="absolute left-[2%] bottom-[4%] hover:cursor-pointer"
            onClick={() => router.push("/picturePage")}
          />
          {isDemographicsSelected && (
            <Image
              src="/button-icon-text-summary.png"
              alt="summary button"
              width={160}
              height={160}
              className="absolute right-[2%] bottom-[4%] hover:cursor-pointer"
              onClick={() => router.push("/demographicsPage")}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AnalysisPage;
