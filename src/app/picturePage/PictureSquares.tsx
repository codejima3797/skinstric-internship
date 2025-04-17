import Image from "next/image";

interface PictureSquaresProps {
  largeRotation?: string;
  mediumRotation?: string;
  smallRotation?: string;
  className?: string;
  size?: 'small' | 'large';
  isLoadingScreen?: boolean;
}

const dimensions = {
  small: {
    small: 300,
    medium: 350,
    large: 400,
    xl: {
      small: 300,
      medium: 350,
      large: 400,
    },
    lg: {
      small: 300,
      medium: 350,
      large: 400,
    },
    md: {
      small: 200,
      medium: 250,
      large: 300,
    },
    sm: {
      small: 200,
      medium: 250,
      large: 300,
    }
  },
  large: {
    small: 400,
    medium: 500,
    large: 600,
    xl: {
      small: 400,
      medium: 500,
      large: 600,
    },
    lg: {
      small: 400,
      medium: 500,
      large: 600,
    },
    md: {
      small: 300,
      medium: 400,
      large: 500,
    },
    sm: {
      small: 300,
      medium: 400,
      large: 500,
    },
  },
};

export const PictureSquares = ({
  largeRotation = "",
  mediumRotation = "",
  smallRotation = "",
  className = "",
  size = 'large',
  isLoadingScreen = false
}: PictureSquaresProps) => {
  const { small, medium, large } = dimensions[size];

  return (
    <div className={`relative ${className}`}>
      {isLoadingScreen ? (
        <>
          <Image
            src="/Intro-square-s.png"
            alt="small square"
            width={small}
            height={small}
            className={`absolute xl:translate-x-[25%] xl:translate-y-[20%] lg:translate-x-[25%] lg:translate-y-[20%] md:translate-x-[51%] md:translate-y-[44%] sm:translate-x-[51%] sm:translate-y-[44%] translate-x-[76%] translate-y-[72%] ${smallRotation} xl:w-[400px] lg:w-[400px] md:w-[300px] sm:w-[300px] w-[240px]`}
            style={{ height: "auto" }}
          />
          <Image
            src="/Intro-square-m.png"
            alt="medium square"
            width={medium}
            height={medium}
            className={`absolute xl:translate-x-[10%] xl:translate-y-[6%] lg:translate-x-[10%] lg:translate-y-[6%] md:translate-x-[32%] md:translate-y-[27%] sm:translate-x-[32%] sm:translate-y-[27%] translate-x-[51%] translate-y-[48%] ${mediumRotation} xl:w-[500px] lg:w-[500px] md:w-[370px] sm:w-[370px] w-[300px]`}
            style={{ height: "auto" }}
          />
          <Image
            src="/Intro-square-l.png"
            alt="large square"
            width={large}
            height={large}
            className={`absolute xl:translate-x-[0%] xl:-translate-y-[3.5%] lg:translate-x-[0%] lg:translate-y-[2%] md:translate-x-[18%] md:translate-y-[13%] sm:translate-x-[18%] sm:translate-y-[13%] translate-x-[32%] translate-y-[30%] ${largeRotation} xl:w-[600px] lg:w-[600px] md:w-[450px] sm:w-[450px] w-[370px]`}
            style={{ height: "auto" }}
          />
        </>
      ) : (
        <>
          <Image
            src="/Intro-square-s.png"
            alt="small square"
            width={small}
            height={small}
            className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${smallRotation} xl:w-[300px] lg:w-[300px] md:w-[200px] sm:w-[200px] w-[150px]`}
            style={{ height: "auto" }}
          />
          <Image
            src="/Intro-square-m.png"
            alt="medium square"
            width={medium}
            height={medium}
            className={`absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${mediumRotation} xl:w-[350px] lg:w-[350px] md:w-[250px] sm:w-[250px] w-[200px]`}
            style={{ height: "auto" }}
          />
          <Image
            src="/Intro-square-l.png"
            alt="large square"
            width={large}
            height={large}
            className={`absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${largeRotation} xl:w-[400px] lg:w-[400px] md:w-[300px] sm:w-[300px] w-[250px]`}
            style={{ height: "auto" }}
          />
        </>
      )}
    </div>
  );
}; 