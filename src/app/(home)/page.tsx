import { Navbar } from "./navbar";
import { IoTriangleSharp } from "react-icons/io5";
import { FaSquareFull } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-dvh overflow-hidden">
      <Navbar />
      <div className="max-w-[80px] max-h-[32px] absolute top-[15px] right-[32px] px-4 py-2 bg-[#1a1b1c]">
        <button className="w-full whitespace-nowrap text-center text-[10px] text-[#fcfcfc] font-[600] flex items-center justify-center leading-[16px] tracking-[-2%] gap-2 cursor-pointer">
          ENTER CODE
        </button>
      </div>
      <div className="flex">
        <div className="w-[30%] h-dvh">
          <div className="w-full h-full flex items-center">
            <div className="relative">
              {/* make these icons styling simpler and with better responsiveness */}
              <FaSquareFull className="w-[25vw] h-[25vw] text-[transparent] absolute -left-[100%] -translate-x-[50%] -translate-y-[65%] border-[2px] border-[#a0a4ab] border-dashed rotate-45" />
              <FaSquareFull className="w-[31.12px] h-[31.12px] text-[transparent] border-[#1a1b1c] border-[1px] rotate-45 absolute translate-x-[100%] -translate-y-[200%]" />
              <IoTriangleSharp className="w-[9px] h-[11px] absolute translate-x-[450%] -translate-y-[470%] rotate-270" />
            </div>
          </div>
        </div>
        <div className="w-[40%] h-dvh text-center flex items-center justify-center">
          <h1 className="text-8xl font-[300] mb-24">Sophisticated skincare</h1>
        </div>
        <div className="w-[30%] h-dvh">
          <div className="w-full h-full flex items-center">
            <div className="relative ml-auto">
              {/* make these icons styling simpler and with better responsiveness */}
              <FaSquareFull className="w-[25vw] h-[25vw] text-[transparent] absolute -left-[100%] -translate-x-[50%] -translate-y-[65%] border-[2px] border-[#a0a4ab] border-dashed rotate-45" />
              <FaSquareFull className="w-[31.12px] h-[31.12px] text-[transparent] border-[#1a1b1c] border-[1px] rotate-45 absolute -translate-x-[200%] -translate-y-[200%]" />
              <IoTriangleSharp className="w-[9px] h-[11px] absolute -translate-x-[550%] -translate-y-[475%] rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
