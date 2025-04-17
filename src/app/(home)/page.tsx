import { Navbar } from "../components/Navbar";
import { HomeTitle } from "./homeTitle";
import { LeftButton } from "./leftButton";
import { RightButton } from "./rightButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-dvh overflow-hidden relative">
      <Navbar variant="intro" />
      <Image
        src="/button-enter-code.png"
        alt="enter code button"
        width={100}
        height={100}
        className="absolute top-[2%] right-[3%] cursor-not-allowed w-[50px] md:w-[75px] lg:w-[100px] h-auto"
      />
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center relative">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between">
          <div className="absolute sm:relative bottom-[20%] sm:bottom-auto left-0 sm:left-auto w-full sm:w-[25%] order-2 sm:order-none">
            <LeftButton />
          </div>
          <div className="w-[80%] sm:w-[50%] absolute sm:relative top-[33%] sm:top-auto order-1 sm:order-none">
            <HomeTitle />
          </div>
          <div className="absolute sm:relative bottom-[20%] sm:bottom-auto right-0 sm:right-auto w-full sm:w-[25%] order-3 sm:order-none">
            <RightButton />
          </div>
        </div>
        <Image
          src="/Skinstric-description.png"
          alt="description"
          width={270}
          height={60}
          className="absolute h-auto w-[200px] md:w-[240px] lg:w-[270px] left-4 xl:bottom[2%] lg:[2%] md:bottom-[2%] sm:bottom-[3%] bottom-[4%] md:left-[2%]"
        />
      </div>
    </div>
  );
}
