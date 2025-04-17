import Image from "next/image";

interface RotatingSquaresProps {
  largeRotation?: string;
  mediumRotation?: string;
  smallRotation?: string;
  className?: string;
  isIntroOrLocation?: boolean;
}

const dimensions = {
  small: 550,
  medium: 650,
  large: 750,
};

export const RotatingSquares = ({
  largeRotation = "",
  mediumRotation = "",
  smallRotation = "",
  className = "",
}: RotatingSquaresProps) => {
  return (
    <div className={`relative w-full h-full  ${className}`}>
      <Image
        src="/Intro-square-s.png"
        alt="small square"
        width={dimensions.small}
        height={dimensions.small}
        className={`absolute w-[35%] h-[35%] sm:w-[53%] sm:h-[53%] md:w-[53%] md:h-[53%] lg:w-[53%] lg:h-[53%] xl:w-[53%] xl:h-[53%] 2xl:w-[53%] 2xl:h-[53%] translate-x-[94%] translate-y-[118%] sm:translate-x-[45%] sm:translate-y-[65%] md:translate-x-[45%] md:translate-y-[65%] lg:translate-x-[45%] lg:translate-y-[65%] xl:translate-x-[45%] xl:translate-y-[65%] 2xl:translate-x-[45%] 2xl:translate-y-[65%] ${smallRotation}`}
        style={{ objectFit: "contain" }}
      />
      <Image
        src="/Intro-square-m.png"
        alt="medium square"
        width={dimensions.medium}
        height={dimensions.medium}
        className={`absolute w-[40%] h-[40%] sm:w-[65%] sm:h-[65%] md:w-[65%] md:h-[65%] lg:w-[65%] lg:h-[65%] xl:w-[65%] xl:h-[65%] 2xl:w-[65%] 2xl:h-[65%] translate-x-[76%] translate-y-[97%] sm:translate-x-[27.5%] sm:translate-y-[44%] md:translate-x-[27.5%] md:translate-y-[44%] lg:translate-x-[27.5%] lg:translate-y-[44%] xl:translate-x-[27.5%] xl:translate-y-[44%] 2xl:translate-x-[27.5%] 2xl:translate-y-[44%] ${mediumRotation}`}
        style={{ objectFit: "contain" }}
      />
      <Image
        src="/Intro-square-l.png"
        alt="large square"
        width={dimensions.large}
        height={dimensions.large}
        className={`absolute w-[45%] h-[45%] sm:w-[75%] sm:h-[75%] md:w-[75%] md:h-[75%] lg:w-[75%] lg:h-[75%] xl:w-[75%] xl:h-[75%] 2xl:w-[75%] 2xl:h-[75%] translate-x-[62%] translate-y-[80.7%] sm:translate-x-[17.5%] sm:translate-y-[31.5%] md:translate-x-[17.5%] md:translate-y-[31.5%] lg:translate-x-[17.5%] lg:translate-y-[31.5%] xl:translate-x-[17.5%] xl:translate-y-[31.5%] 2xl:translate-x-[17.5%] 2xl:translate-y-[31.5%] ${largeRotation}`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};
