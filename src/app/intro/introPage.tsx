import { Navbar } from "../(home)/navbar";

export const Intro = () => {
  return (
    <div className="container h-dvh">
      <Navbar />
      <header>
        <div className="w-[227px] h-[24px] text-[16px] font-[600] leading-[24px] absolute top-[86px] left-[32px]">
          TO START ANALYSIS
        </div>
      </header>
      <div>
        <h4 className="absolute top-[44%] left-[45%] text-center opacity-40 text-[14px] font-[400]">
          WHERE ARE YOU FROM?
        </h4>
        <input
          className="max-w-[400px] absolute top-[48%] left-[38%] text-[60px] font-[400] text-center leading-[64px] tracking-[-7%]"
          type="text"
          placeholder="Melbourne"
        />
      </div>
    </div>
  );
};
