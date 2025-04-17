"use client";

import Image from "next/image";

const AnalysisSquares = () => {
  return (
    <>
      <div className="w-full h-full">
        <Image
          src="/Intro-square-l.png"
          alt="large square"
          width={600}
          height={600}
          className="absolute xl:w-[600px] xl:h-[600px] lg:w-[600px] lg:h-[600px] md:w-[600px] md:h-[600px] sm:w-[500px] sm:h-[500px] w-[330px] h-[330px] xl:top-0 xl:left-0 lg:top-0 lg:left-0 md:top-0 md:left-0 sm:top-[10%] sm:left-0 top-[23.7%] left-[19.15%]"
          />
        <Image
          src="/Intro-square-m.png"
          alt="medium square"
          width={500}
          height={500}
          className="absolute xl:w-[500px] xl:h-[500px] lg:w-[500px] lg:h-[500px] md:w-[500px] md:h-[500px] sm:w-[400px] sm:h-[400px] w-[290px] h-[290px] xl:top-[8%] xl:left-[8%] lg:top-[8%] lg:left-[8%] md:top-[8%] md:left-[8%] sm:top-[18%] sm:left-[8.5%] top-[27%] left-[22.5%]"
          />
        <Image
          src="/Intro-square-s.png"
          alt="small square"
          width={400}
          height={400}
          className="absolute xl:w-[400px] xl:h-[400px] lg:w-[400px] lg:h-[400px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] w-[250px] h-[250px] xl:top-[16%] xl:left-[16%] lg:top-[16%] lg:left-[16%] md:top-[16%] md:left-[16%] sm:top-[26%] sm:left-[17%] top-[30.2%] left-[25.9%]"
          />
      </div>
    </>
  );
};

export default AnalysisSquares; 